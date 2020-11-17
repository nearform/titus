import T from 'prop-types'
import React, { useContext, lazy } from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'

import history from './history'
import { AuthContext } from './components/authentication/authentication-context'
import { ROUTES } from './constants'
import config from './config'

const AsyncLogin = lazy(() => import('./pages/login'))
const AsyncDashboard = lazy(() => import('./pages/dashboard'))

const PrivateRoute = ({ component: Component, componentProps, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Route {...props}>
            {props => <Component {...props} {...componentProps} />}
          </Route>
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: props.location }
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

function renderAdmin(user) {
  if (!config.enableAdmin) {
    return null
  }

  const AsyncAdmin = lazy(() => import('@nearform/brokeneck-react'))

  return (
    <PrivateRoute
      path={ROUTES.ADMIN}
      component={AsyncAdmin}
      componentProps={{
        serverUrl: config.adminServerUrl,
        token: user?.idToken,
        basename: ROUTES.ADMIN
      }}
    />
  )
}

const AppRouter = () => {
  const { user } = useContext(AuthContext)

  return (
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.LOGIN}>
          <AsyncLogin />
        </Route>
        <PrivateRoute
          path={ROUTES.DASHBOARD}
          exact={true}
          component={AsyncDashboard}
        />
        {renderAdmin(user)}
      </Switch>
    </Router>
  )
}

export default AppRouter
