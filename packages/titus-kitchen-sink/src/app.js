import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import Loadable from 'react-loadable'
import ApolloClient from 'apollo-boost'
import {createGenerateClassName, CssBaseline} from '@material-ui/core'
import { ApolloProvider } from 'react-apollo'

import Auth from './components/authentication/auth'
import Loading from './loading'
import { ThemeProvider, THEME } from './theme'

const AsyncLayout = Loadable({
  loader: () => import('./layout'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncLogin = Loadable({
  loader: () => import('./components/login/login'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: window.localStorage.getItem('titus-user')
      }
    })
  },
  clientState: {
    defaults: {
      themeName: THEME.default
    }
  }
})

const generateClassName = createGenerateClassName()

const App = () => (
  <ApolloProvider client={apolloClient}>
    <React.Fragment>
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
    </React.Fragment>
  </ApolloProvider>
)

export default App
