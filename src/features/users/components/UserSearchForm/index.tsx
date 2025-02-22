import { useEffect, useMemo } from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { setSearchTerm } from '@features/users/store/searchSlice';
import { useDebounce } from '@shared/hooks/useDebounce';
import { DEBOUNCE_DELAY } from '@shared/constants';

interface SearchFormInputs {
  username: string;
}

export function UserSearchForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  const searchSchema = useMemo(() => 
    yup.object({
      username: yup.string().required(t('userSearch.validation.required'))
    }),
    [t]
  );

  const { register, watch, trigger, formState: { errors }, setValue } = useForm<SearchFormInputs>({
    resolver: yupResolver(searchSchema),
    defaultValues: { username: '' },
    mode: 'all'
  });

  const usernameValue = watch('username');
  const debouncedValue = useDebounce(usernameValue, DEBOUNCE_DELAY);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedValue));
  }, [debouncedValue, dispatch]);

  // Force re-render of form when language changes
  useEffect(() => {
    const currentValue = usernameValue;
    setValue('username', '');
    setValue('username', currentValue);
  }, [i18n.language, setValue, usernameValue]);

  const handleBlur = async () => {
    await trigger('username');
  };

  const { ref, ...rest } = register('username', { onBlur: handleBlur });

  return (
    <TextField
      inputRef={ref}
      {...rest}
      label={t('features.userSearch.username')}
      variant="outlined"
      fullWidth
      sx={{ marginBottom: 2 }}
      error={!!errors.username}
      helperText={errors.username?.message}
    />
  );
} 