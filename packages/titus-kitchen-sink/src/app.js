import React, { Fragment } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  createGenerateClassName,
  MuiThemeProvider
} from '@material-ui/core/styles'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Navigation } from '@nearform/titus-components'
import UserProfile from './components/user-profile/user-profile'

import { theme } from './theme/theme'
import Menu from './menu'
import Routes from './routes'
import Auth from './components/authentication/auth'
import Login from './components/login/login.js'

const meta = {
  appName: 'Titus Docs and Examples'
}

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
    <Fragment>
      <CssBaseline />
      {/*
        JssProvider is required to fix classname conflict on production build,
        this is a known issue:  https://github.com/mui-org/material-ui/issues/8223
        */}
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Auth>
            {isAuthenticated =>
              isAuthenticated ? (
                <Navigation
                  title={meta.appName}
                  items={<Menu />}
                  headerRight={UserProfile}
                >
                  <Routes />
                </Navigation>
              ) : (
                <Login />
              )
            }
          </Auth>
        </MuiThemeProvider>
      </JssProvider>
    </Fragment>
  </ApolloProvider>
)

export default App
