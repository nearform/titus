import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './containers/dashboard/dashboard'
import Wizard from './containers/wizard/wizard'

const Routes = () => (
  <Router>
    <Dashboard path='/' />
    <Wizard path='wizard/*' />
  </Router>
)

Routes.propTypes = {
}

export default Routes
