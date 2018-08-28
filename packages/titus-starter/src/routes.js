import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './containers/dashboard/dashboard'

const Routes = () => (
  <Router>
    <Dashboard path='/' />
  </Router>
)

Routes.propTypes = {}

export default Routes
