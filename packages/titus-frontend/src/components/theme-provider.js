import React from 'react'
import T from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { themes } from '../theme'

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={themes.NearForm}>{children}</MuiThemeProvider>
)

ThemeProvider.propTypes = {
  children: T.node.isRequired
}

export default ThemeProvider
