import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';

import Dashboard from './containers/dashboard/dashboard';
import Wizard from './containers/wizard/wizard';

const Routes = ({ menuOpen }) => (
  <Router>
    <Dashboard path="/" />
    <Wizard path="wizard/*" />
  </Router>
);

Routes.propTypes = {
  menuOpen: PropTypes.bool
};

export default Routes;
