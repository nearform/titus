import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import Loadable from 'react-loadable'
import ApolloClient from 'apollo-boost'
import {
  createGenerateClassName,
  MuiThemeProvider,
  CssBaseline
} from '@material-ui/core'
import { ApolloProvider } from 'react-apollo'

import { theme } from './theme/theme'
import Auth from './components/authentication/auth'
import Loading from './loading'

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
        <MuiThemeProvider theme={theme}>
          <Auth>
            {isAuthenticated =>
              isAuthenticated ? <AsyncLayout /> : <AsyncLogin />
            }
          </Auth>
        </MuiThemeProvider>
      </JssProvider>
    </React.Fragment>
  </ApolloProvider>
)

export default App
