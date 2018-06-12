import React, { Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

import Navigation from '../components/navigation/navigation';

import Menu from './menu';
import Routes from './routes';

const meta = {
  appName: 'Titus Starter Shell'
};

const App = () => (
  <Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Navigation title={meta.appName} items={Menu} main={Routes} />
    </MuiThemeProvider>
  </Fragment>
);

export default App;
