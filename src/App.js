import React, { Component } from 'react';
import MainNav from './nav/MainNav';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <MainNav />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
