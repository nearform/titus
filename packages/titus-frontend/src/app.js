import React, { lazy, Suspense } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, CssBaseline } from '@material-ui/core'
import Auth from './components/authentication/auth'
import ThemeProvider from './components/theme-provider'
import Loading from './loading'

const AsyncLayout = lazy(() => import('./layout'))
const AsyncLogin = lazy(() => import('./components/login/login'))

const generateClassName = createGenerateClassName()

const App = () => (
  <Suspense fallback={<Loading />}>
    <CssBaseline />
    {/*
        JssProvider is required to fix classname conflict on production build,
        this is a known issue:  https://github.com/mui-org/material-ui/issues/8223
        */}
    <JssProvider generateClassName={generateClassName}>
      <ThemeProvider>
        <Auth>
          {isAuthenticated =>
            isAuthenticated ? <AsyncLayout /> : <AsyncLogin />
          }
        </Auth>
      </ThemeProvider>
    </JssProvider>
  </Suspense>
)

export default App
