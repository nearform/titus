import React from 'react'
import { graphql } from 'react-apollo'
import IconButton from '@material-ui/core/IconButton'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import { loader } from 'graphql.macro'
import { THEME } from '../theme'

const query = loader('../theme/query.graphql')

const ThemeSwitcher = ({ data: { themeName }, client }) => (
  <IconButton
    title={`Switch to ${themeName === THEME.default ? THEME.nearform : THEME.default} theme`}
    color="inherit"
    onClick={() =>
      client.writeData({
        data: {
          themeName: themeName === THEME.default ? THEME.nearform : THEME.default
        }
      })
    }
  >
    <InvertColorsIcon />
  </IconButton>
)

export default graphql(query)(ThemeSwitcher)
