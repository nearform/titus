import React from 'react'
import { Query } from 'react-apollo'
import IconButton from '@material-ui/core/IconButton'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import { getThemeName } from '../../theme/queries.graphql'
import { THEME } from '../../theme'

const ThemeSwitcher = () => (
  <Query query={getThemeName}>
    {({ data: { themeName }, client }) => (
      <IconButton
        title="Switch color theme"
        color="inherit"
        onClick={() =>
          client.writeData({
            data: {
              themeName:
                themeName === THEME.default ? THEME.nearForm : THEME.default
            }
          })
        }
      >
        <InvertColorsIcon />
      </IconButton>
    )}
  </Query>
)

export default ThemeSwitcher
