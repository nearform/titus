import React from 'react'
import { Router } from '@reach/router'
import LoginChecker from './containers/loginchecker/loginchecker.js'
import Login from './containers/login_container/login_container'

import Dashboard from './containers/dashboard/dashboard'

const Routes = () => (
  <LoginChecker loginComponent={Login}>
    <Router>
      <Dashboard path='/' />
    </Router>
  </LoginChecker>
)

Routes.propTypes = {
}

export default Routes
