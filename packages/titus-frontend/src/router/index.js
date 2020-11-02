import T from 'prop-types'
import React, { useContext, lazy } from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { AuthContext } from '~/components/authentication/authentication-context'
import { ROUTES } from '~/constants'

const AsyncLogin = lazy(() => import('~/pages/login'))
const AsyncDashboard = lazy(() => import('~/pages/dashboard'))

const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          <Route location={location} component={Component} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}
PrivateRoute.propTypes = {
  component: T.oneOfType([T.object, T.func])
}

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path={ROUTES.LOGIN}>
        <AsyncLogin />
      </Route>
      {/* INSERT NEW ROUTES HERE */}
      <PrivateRoute path={ROUTES.DASHBOARD} component={AsyncDashboard} />
    </Switch>
  </Router>
)

export { AppRouter, history }
