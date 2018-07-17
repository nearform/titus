import React, { Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { Navigation } from '@nearform/titus-components'

import { theme } from './theme/theme'

import Menu from './menu'
import Routes from './routes'

import { store } from './store/store'

const meta = {
  appName: 'Titus Starter Shell'
}

const App = () => (
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Navigation title={meta.appName} items={Menu} main={Routes} />
      </MuiThemeProvider>
    </Fragment>
  </Provider>
)

export default App
