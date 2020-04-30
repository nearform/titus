import T from 'prop-types'
import React, { useContext, lazy, Suspense } from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import history from './history'
import Layout from './components/layout'
import Loading from './components/loading'
import { AuthContext } from './components/authentication/authentication-context'
import { ROUTES } from './constants'

const AsyncLogin = lazy(() => import('./pages/login'))
const AsyncDashboard = lazy(() => import('./pages/dashboard'))

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

const AppRouter = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Router history={history}>
          <Switch>
            <Route path={ROUTES.LOGIN}>
              <AsyncLogin />
            </Route>
            {/* INSERT NEW ROUTES HERE */}
            <PrivateRoute path={ROUTES.DASHBOARD} component={AsyncDashboard} />
          </Switch>
        </Router>
      </Suspense>
    </Layout>
  )
}

export default AppRouter
