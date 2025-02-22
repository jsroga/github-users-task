import { useEffect, useMemo, useState } from 'react';
import { TextField, LinearProgress } from '@mui/material';
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
  const [isTyping, setIsTyping] = useState(false);
  
  const searchSchema = useMemo(() => 
    yup.object({
      username: yup.string().required(t('features.userSearch.validation.required'))
    }),
    [t]
  );

  const { register, watch, trigger, formState: { errors, isValid }, setValue } = useForm<SearchFormInputs>({
    resolver: yupResolver(searchSchema),
    defaultValues: { username: '' },
    mode: 'onChange'
  });

  const usernameValue = watch('username');
  const debouncedValue = useDebounce(usernameValue, DEBOUNCE_DELAY);

  // Show loading only when typing and input is valid
  useEffect(() => {
    if (usernameValue !== debouncedValue && isValid && usernameValue.trim()) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [usernameValue, debouncedValue, isValid]);

  useEffect(() => {
    if (isValid && debouncedValue.trim()) {
      dispatch(setSearchTerm(debouncedValue));
    } else {
      dispatch(setSearchTerm(''));
    }
  }, [debouncedValue, dispatch, isValid]);

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
    <div>
      <TextField
        inputRef={ref}
        {...rest}
        label={t('features.userSearch.username')}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: isTyping ? 0 : 2 }}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      {isTyping && (
        <LinearProgress 
          sx={{ 
            marginBottom: 2,
            marginTop: '2px',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4
          }} 
        />
      )}
    </div>
  );
} 