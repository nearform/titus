import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import { theme } from './theme/theme'

import Navigation from '../components/navigation/navigation'

import Menu from './menu'
import Routes from './routes'

import { store } from './store/store'

const meta = {
  appName: 'Titus Starter Shell'
}

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Navigation title={meta.appName} items={Menu} main={Routes} />
    </MuiThemeProvider>
  </Provider>
)

export default App
