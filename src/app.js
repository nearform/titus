import React, { Fragment } from 'react';
import MainNav from './nav/main-nav';
import BasicContent from './content/basic-content';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import { metaData } from './mock/app-data';

const App = () => (
  <Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <MainNav appName={metaData.name}>
        <BasicContent textContent={metaData.description} />
      </MainNav>
    </MuiThemeProvider>
  </Fragment>
);

export default App;
