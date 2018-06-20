import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './containers/dashboard/dashboard'
import Wizard from './containers/wizard/wizard'
import Visualisations from './containers/visualisations/visualisations'

const Routes = () => (
  <Router>
    <Dashboard path='/' />
    <Wizard path='wizard/*' />
    <Visualisations path='visualisations/*' />
  </Router>
)

Routes.propTypes = {
}

export default Routes
