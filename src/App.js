import React, { Component, Fragment } from 'react';
import MainNav from './nav/MainNav';
import BasicContent from './content/BasicContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import { metaData } from './mock/appData';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <MainNav appName={metaData.name}>
            <BasicContent textContent={metaData.description} />
          </MainNav>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
