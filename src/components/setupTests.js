// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// You can override environment variables globally for the tests environment below.
process.env = Object.assign(process.env, {
  // Cache default is 24 hours in miliseconds
  REACT_APP_AXIOS_CACHE_TTL: 86400000,
  REACT_APP_CACHE_DEBUG: false,

  REACT_APP_AXIOS_DELAY: 0,

  REACT_APP_ROWS_PER_PAGE: 10,
})

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
  Trans: ({ children }) => children,
}));
