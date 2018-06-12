import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';

import Dashboard from './containers/dashboard/dashboard';

const Routes = ({ menuOpen }) => (
  <Router>
    <Dashboard path="dashboard" />
  </Router>
);

Routes.propTypes = {
  menuOpen: PropTypes.bool
};

export default Routes;
