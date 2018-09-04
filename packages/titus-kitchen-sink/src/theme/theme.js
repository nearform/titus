import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#0B2A5C' },
    type: 'light'
  },
  menuWidth: 300
})

const nearFormTheme = createMuiTheme({
  palette: {
    primary: { main: 'rgba(33,101,229,1)' },
    secondary: { main: '#fd775e' },
    type: 'light'
  },
  menuWidth: 300
})

export const THEME = {
  default: 'default',
  nearForm: 'nearForm'
}

export const themes = {
  [THEME.default]: defaultTheme,
  [THEME.nearForm]: nearFormTheme
}
