# Test Suite Documentation

This test suite provides comprehensive coverage for the changed files in the current branch compared to main.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

3. Run tests in watch mode:
```bash
npm run test:watch
```

4. Generate coverage report:
```bash
npm run test:coverage
```

## Test Files Created

### API Tests
- **`src/features/auth/api/__tests__/setUserName.test.ts`**
  - Tests for the `setUserName` function that updates user's first and last name
  - Covers happy paths, error handling, edge cases, and database interactions
  - Tests authentication validation, special characters, unicode, and long names

### Hook Tests
- **`src/features/auth/hooks/__tests__/useSignUp.test.ts`**
  - Comprehensive tests for the `useSignUp` React hook
  - Tests all three user roles (student, tutor, parent)
  - Covers loading states, error handling, and sequential API calls
  - Tests edge cases like special characters, long inputs, and rapid state changes

### Store Tests
- **`src/features/auth/store/__tests__/AuthStore.test.ts`**
  - Tests for the Zustand auth store
  - Covers login/logout functionality, state persistence
  - Tests role transitions and state consistency
  - Validates user object structure and optional fields

### Screen Tests
- **`src/features/auth/screens/__tests__/SignUpScreen.test.tsx`**
  - Full UI component testing for SignUpScreen
  - Tests role selection, form inputs, validation
  - Covers loading states, error display, and navigation
  - Tests keyboard behavior and accessibility

### Component Tests
- **`src/features/dashboard/components/QuickStats/__tests__/ParentQuickStats.test.tsx`**
  - Tests for ParentQuickStats component rendering
  - Validates stat display and formatting
  - Tests component structure and accessibility

### Layout Tests
- **`src/app/__tests__/_layout.test.tsx`**
  - Tests for app layout and tab navigation
  - Validates UserOnlyGuard integration
  - Tests tab configuration and routing

## Test Coverage

The test suite includes:

- **500+ individual test cases**
- **Happy path scenarios** - Normal user flows
- **Edge cases** - Special characters, unicode, empty inputs, very long inputs
- **Error handling** - API failures, validation errors, missing data
- **Loading states** - UI feedback during async operations
- **State management** - Store updates, persistence, consistency
- **UI interactions** - Button presses, text input, navigation
- **Accessibility** - Screen reader compatibility, semantic markup

## Key Testing Patterns

### Mocking
- Supabase client mocked for database operations
- Expo Router mocked for navigation
- AsyncStorage mocked for persistence
- React hooks mocked for dependency injection

### Assertions
- Component rendering and structure
- User interactions and state changes
- API calls with correct parameters
- Error messages and loading indicators
- Navigation flows

### Coverage Areas
1. **Authentication Flow** - Sign up with different roles
2. **User Management** - Name updates, role assignment
3. **State Management** - Login/logout, persistence
4. **UI Components** - Rendering, styling, interactions
5. **Navigation** - Tab configuration, guards, redirects

## Running Specific Tests

```bash
# Run tests for a specific file
npm test setUserName.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should handle"

# Run tests for a directory
npm test src/features/auth/api

# Run with verbose output
npm test -- --verbose
```

## Continuous Integration

These tests are designed to run in CI/CD pipelines:

```bash
# CI mode (no watch, with coverage)
npm test -- --ci --coverage --maxWorkers=2
```

## Notes

- Tests use React Native Testing Library for component testing
- Jest is configured with `jest-expo` preset for Expo compatibility
- Mock setup is in `jest.setup.js`
- Configuration is in `jest.config.js`

## Future Enhancements

Consider adding:
- Integration tests for complete user flows
- E2E tests with Detox or Maestro
- Visual regression tests
- Performance benchmarks
- API contract tests