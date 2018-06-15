import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './containers/dashboard/dashboard'
import Wizard from './containers/wizard/wizard'
import Tables from './containers/tables/tables'

const Routes = () => (
  <Router>
    <Dashboard path='/' />
    <Wizard path='wizard/*' />
    <Tables path='tables/*' />
  </Router>
)

Routes.propTypes = {}

export default Routes
