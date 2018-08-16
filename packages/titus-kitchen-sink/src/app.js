import React, { Fragment } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { Navigation } from '@nearform/titus-components'
import UserProfile from './containers/user-profile/user-profile'

import { theme } from './theme/theme'

import Menu from './menu'
import Routes from './routes'

import Auth from './lib/auth'
import authProvider from './lib/auth-provider'
import Login from './containers/login/login.js'

import { store } from './store/store'

const meta = {
  appName: 'Titus Docs and Examples'
}

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const generateClassName = createGenerateClassName()

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Fragment>
        <CssBaseline />
        {/*
        JssProvider is required to fix classname conflict on production build,
        this is a known issue:  https://github.com/mui-org/material-ui/issues/8223
        */}
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <Auth loginComponent={<Login authProvider={authProvider} />}>
              <Navigation
                title={meta.appName}
                items={Menu}
                main={Routes}
                headerRight={UserProfile}
              />
            </Auth>
          </MuiThemeProvider>
        </JssProvider>
      </Fragment>
    </Provider>
  </ApolloProvider>
)

export default App
