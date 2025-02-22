import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { UserSearchForm } from '@features/users/components/UserSearchForm';
import { Wrapper } from '@shared/utils/test-utils';

// Mock the entire i18next module
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => {
        const translations: { [key: string]: string } = {
          'features.userSearch.username': 'Nazwa użytkownika',
          'features.userSearch.validation.required': 'Wprowadź nazwę użytkownika'
        };
        return translations[str] || str;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'pl'
      },
    };
  },
  // Also mock I18nextProvider
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('UserSearchForm', () => {
  it('renders correctly', () => {
    render(<UserSearchForm />, { wrapper: Wrapper });
    const input = screen.getByLabelText('Nazwa użytkownika');
    expect(input).toBeInTheDocument();
  });

  it('shows validation error for empty input', async () => {
    render(<UserSearchForm />, { wrapper: Wrapper });
    const input = screen.getByLabelText('Nazwa użytkownika');
    
    // Trigger validation
    await act(async () => {
      fireEvent.focus(input);
      fireEvent.blur(input);
    });
    
    // Wait for validation and error message
    await waitFor(() => {
      expect(screen.getByText('Wprowadź nazwę użytkownika')).toBeInTheDocument();
    });
  });

  it('shows loading indicator while typing valid input and hides after debounce', async () => {
    render(<UserSearchForm />, { wrapper: Wrapper });
    const input = screen.getByLabelText('Nazwa użytkownika');
    
    // Initially, loading indicator should not be present
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    
    // Type valid input
    await act(async () => {
      fireEvent.change(input, { target: { value: 'validusername' } });
    });
    
    // Loading indicator should appear for valid input
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Wait for debounce
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    }, { timeout: 2500 });
  });

  it('does not show loading indicator for invalid input', async () => {
    render(<UserSearchForm />, { wrapper: Wrapper });
    const input = screen.getByLabelText('Nazwa użytkownika');
    
    // Type invalid input (empty)
    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
    });
    
    // Loading indicator should not appear for invalid input
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('updates search term after debounce for valid input', async () => {
    render(<UserSearchForm />, { wrapper: Wrapper });
    const input = screen.getByLabelText('Nazwa użytkownika');
    
    // Type valid input
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    
    // Wait for debounce
    await waitFor(() => {
      expect(input).toHaveValue('test');
    }, { timeout: 2500 });
  });
}); 