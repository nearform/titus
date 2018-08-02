import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
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
  uri: 'http://localhost:5000/graphql',
  request: async (operation) => {
    operation.setContext({
      headers: {
        authorization: window.localStorage.getItem('titus-user')
      }
    })
  }
})

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Auth loginComponent={<Login authProvider={authProvider} />}>
            <Navigation title={meta.appName} items={Menu} main={Routes} headerRight={UserProfile} />
          </Auth>
        </MuiThemeProvider>
      </Fragment>
    </Provider>
  </ApolloProvider>
)

export default App
