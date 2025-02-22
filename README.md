# GitHub Users Search

A React TypeScript application that allows users to search for GitHub users with real-time results and infinite scrolling.

## 🚀 Features

- Real-time GitHub user search with 2-second debounce
- Infinite scroll for loading more results
- Responsive Material UI design
- Internationalization support (EN/PL)
- Type-safe development with TypeScript
- Unit tests with Jest and React Testing Library
- Error handling and loading states
- Form validation

## 🛠️ Technologies

- React 18
- TypeScript
- Material UI
- React Query (TanStack Query)
- Redux Toolkit
- React Hook Form with Yup validation
- i18next for internationalization
- Jest & React Testing Library
- Vite

## 📋 Requirements

The project meets the following requirements:

1. Core files limited to 4 main TypeScript/TSX files containing logic and components
2. ReactJS with TypeScript and React Query for GitHub API requests
3. Search form with 2-second debounce after user input
4. Display list of matching GitHub users
5. Proper error and empty state handling
6. Infinite scroll implementation using react-infinite-scroller
7. Unit tests for components and application logic
8. Material UI styling with clean component organization
9. Functional programming techniques implementation
10. Additional features and improvements beyond base requirements

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jsroga/github-users-task.git
cd github-users-task
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 📁 Project Structure

```
src/
├── features/
│   └── users/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       └── types/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── i18n/
├── lib/
├── store/
└── config/
```

## 🌐 API Integration

The application integrates with the GitHub Users API:
- Search endpoint: `https://api.github.com/search/users`
- Results are cached using React Query
- Proper error handling and rate limiting consideration

## 🎨 UI/UX Features

- Responsive design
- Loading states with skeletons
- Error messages with retry options
- Clean and modern Material UI components
- Smooth infinite scrolling experience
- Form validation with immediate feedback

## 🔍 Core Components

1. `UserSearchForm`: Handles user input with debounce
2. `UserList`: Manages the infinite scroll and user list display
3. `UserCard`: Individual user card display
4. `useGithubUsers`: Custom hook for GitHub API integration

## 🌍 Internationalization

The application supports multiple languages:
- English (default)
- Polish

Language detection is automatic based on browser settings.

## 🧪 Testing

- Component tests using React Testing Library
- API integration tests
- Hook testing
- Proper test coverage for core functionality

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 License

This project is open source and available under the MIT License.