import React, { Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { Navigation } from '@nearform/titus-components'
import UserProfile from './containers/user-profile/user-profile-container'

import { theme } from './theme/theme'

import Menu from './menu'
import Routes from './routes'

import Auth from './lib/auth'
import Login from './containers/login/login.js'

import { store } from './store/store'

const meta = {
  appName: 'Titus Starter Shell'
}

const App = () => (
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Auth loginComponent={Login}>
          <Navigation title={meta.appName} items={Menu} main={Routes} headerRight={UserProfile} />
        </Auth>
      </MuiThemeProvider>
    </Fragment>
  </Provider>
)

export default App
