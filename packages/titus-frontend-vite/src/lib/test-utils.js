// Setup for React Testing Library functional tests
// - see https://testing-library.com/docs/react-testing-library/setup
import React, { Suspense } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import locale from 'lib/locale'
import { LANGUAGES } from 'lib/constants'
import AppRouter from 'lib/router'
import { AuthProvider } from 'components/authentication/authentication-context'

const resources = {
  en: {
    translation: locale.en
  }
}
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  keySeparator: '.' // we use content as keys
})
for (const lng of LANGUAGES) {
  i18n.addResourceBundle(lng.code, 'translation', locale[lng.code])
}

class MockAuthProvider extends React.Component {
  constructor(props) {
    super(props)
    this.isAuthenticated = props.initialAuthenticated
  }
  render() {
    return (
      <AuthProvider
        provider={{
          isAuthenticated: () => this.isAuthenticated,
          login: user => {
            this.isAuthenticated = true
            return { username: user.username }
          },
          logout: () => {
            this.isAuthenticated = false
            return true
          },
          getUserData: () => {}
        }}
      >
        {this.props.children}
      </AuthProvider>
    )
  }
}

const AllTheProviders = ({ children, isAuthenticated }) => (
  <MockAuthProvider initialAuthenticated={isAuthenticated}>
    {children}
  </MockAuthProvider>
)

// Useful when we want to test route changes.
// Needs to test using aysnc and await waitForElementToBeRemoved(() => getByText('loading'))
const renderWithRouter = (ui, isAuthenticated = false) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <AllTheProviders isAuthenticated={isAuthenticated}>
        <Suspense fallback={<div>loading</div>}>
          <AppRouter>{children}</AppRouter>
        </Suspense>
      </AllTheProviders>
    </BrowserRouter>
  )
  return {
    ...render(ui, { wrapper: Wrapper })
  }
}
const renderWithAuthedRouter = ui => renderWithRouter(ui, true)

// Useful when we don't need to test route changes - removes the need for async
const renderWithMockRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>
      <AllTheProviders>{children}</AllTheProviders>
    </Router>
  )
  return {
    ...render(ui, { wrapper: Wrapper })
  }
}

export * from '@testing-library/react'
export {
  renderWithMockRouter as render,
  renderWithRouter,
  renderWithAuthedRouter
}
