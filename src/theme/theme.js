import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#0B2A5C' },
    type: 'light'
  },
  menuWidth: 280, // custom, maybe a better place for this...
  verticalPad: '20px'
});
