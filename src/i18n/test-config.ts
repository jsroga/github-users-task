import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'pl',
    fallbackLng: 'pl',
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
      pl: {
        translation: {
          pages: {
            home: {
              title: 'Wyszukiwarka użytkowników GitHub'
            }
          },
          features: {
            userSearch: {
              username: 'Nazwa użytkownika',
              validation: {
                required: 'Wprowadź nazwę użytkownika'
              }
            }
          },
          common: {
            error: {
              title: 'Wystąpił błąd',
              unexpected: 'Wystąpił nieoczekiwany błąd',
              retry: 'Spróbuj ponownie',
              refresh: 'Odśwież stronę',
              fetchUsers: 'Nie udało się pobrać użytkowników'
            },
            loading: 'Ładowanie...',
            noResults: 'Brak wyników'
          }
        }
      }
    }
  });

export default i18n; 