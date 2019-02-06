import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#0B2A5C' },
    type: 'light'
  },
  menuWidth: 300
})

const nearformTheme = createMuiTheme({
  palette: {
    primary: { main: '#2165e5' },
    secondary: { main: '#fd775e' },
    type: 'light'
  },
  nearform: {
    blue: '#2165e5',
    midnightBlue: '#194caa',
    sand4: '#6d6d68',
    sand3: '#908A8A',
    sand2: '#A8A4A3',
    sand1: '#f4f4f2',
    supersplit: '#fd775e',
    brunchPink: '#fd7a9e',
    bubblegum: '#f9c3c0'
  },
  menuWidth: 300
})

export const THEME = {
  default: 'default',
  nearform: 'NearForm'
}

export const themes = {
  [THEME.default]: defaultTheme,
  [THEME.nearform]: nearformTheme
}
