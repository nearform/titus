import React from 'react'
import T from 'prop-types'
import { Query } from 'react-apollo'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { getThemeName } from '-!graphql-tag/loader!./queries.gql' // eslint-disable-line import/no-webpack-loader-syntax
import { themes } from './theme'

const ThemeProvider = ({children}) => (
  <Query query={getThemeName}>
    {({data: {themeName}}) => (
      <MuiThemeProvider theme={themes[themeName]}>
        {children}
      </MuiThemeProvider>
    )}
  </Query>
)

ThemeProvider.propTypes = {
  children: T.node.isRequired
}

export default ThemeProvider
