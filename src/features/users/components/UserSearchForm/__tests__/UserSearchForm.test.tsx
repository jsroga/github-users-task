import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserSearchForm } from '@features/users/components/UserSearchForm';
import { Wrapper } from '@shared/utils/test-utils';

// Mock the entire i18next module
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => {
        const translations: { [key: string]: string } = {
          'userSearch.username': 'Nazwa użytkownika',
          'userSearch.validation.required': 'Wprowadź nazwę użytkownika'
        };
        return translations[str] || str;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  // Also mock I18nextProvider
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('UserSearchForm', () => {
  it('renders correctly', () => {
    const { container } = render(<UserSearchForm />, { wrapper: Wrapper });
    screen.debug(container);
    const input = screen.getByRole('textbox', { name: /nazwa użytkownika/i });
    expect(input).toBeInTheDocument();
  });

  it('shows validation error for empty input', async () => {
    render(<UserSearchForm />, { wrapper: Wrapper });
    const input = screen.getByRole('textbox', { name: /nazwa użytkownika/i });
    
    // Trigger validation
    await fireEvent.focus(input);
    await fireEvent.blur(input);
    
    // Wait for validation and error message
    await waitFor(() => {
      // The error message should be in the helper text
      const helperText = screen.getByText('Wprowadź nazwę użytkownika');
      expect(helperText).toBeInTheDocument();
      
      // Input should have aria-invalid="true"
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });
}); 