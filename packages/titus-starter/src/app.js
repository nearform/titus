import React, { Fragment } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  createGenerateClassName,
  MuiThemeProvider
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { Navigation } from '@nearform/titus-components'

import { theme } from './theme/theme'

import Menu from './menu'
import Routes from './routes'

import { store } from './store/store'

const meta = {
  appName: 'Titus Starter Shell'
}

const generateClassName = createGenerateClassName()

const App = () => (
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      {/*
        JssProvider is required to fix classname conflict on production build,
        this is a known issue:  https://github.com/mui-org/material-ui/issues/8223
        */}
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Navigation title={meta.appName} items={Menu} main={Routes} />
        </MuiThemeProvider>
      </JssProvider>
    </Fragment>
  </Provider>
)

export default App
