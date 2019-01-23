import React from 'react'
import T from 'prop-types'
import { graphql } from 'react-apollo'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { themes } from '../theme'
import { loader } from 'graphql.macro'

const query = loader('../theme/query.graphql')

const ThemeProvider = ({ children, data: { themeName } }) => (
  <MuiThemeProvider theme={themes[themeName]}>{children}</MuiThemeProvider>
)

ThemeProvider.propTypes = {
  children: T.node.isRequired
}

export default graphql(query)(ThemeProvider)
