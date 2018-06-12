import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';

import Dashboard from './containers/dashboard/dashboard';

const Routes = () => (
  <Router>
    <Dashboard path="/" />
  </Router>
);

Routes.propTypes = {
  menuOpen: PropTypes.bool
};

export default Routes;
