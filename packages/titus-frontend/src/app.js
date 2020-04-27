import React, { lazy, Suspense } from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import history from './history'
import Loading from './components/loading'
import Auth from './components/authentication'
import Authentication, { Login } from './components/auth-providers/in-memory'
import './styles.css'
import config from './config'

const AsyncLogin = lazy(() => import('./pages/login'))
const AsyncDashboard = lazy(() => import('./pages/dashboard'))

const authentication = new Authentication({ config })

const App = () => (
  <Suspense fallback={<Loading />}>
    <Auth authentication={authentication} component={Login}>
      {isAuthenticated => (
        <Router history={history}>
          <Switch>
            <Route path="/login">
              <AsyncLogin />
            </Route>
            <Route
              path="/"
              render={() =>
                isAuthenticated ? <AsyncDashboard /> : <Redirect to="/login" />
              }
            />
            {/* INSERT NEW ROUTES HERE */}
          </Switch>
        </Router>
      )}
    </Auth>
  </Suspense>
)

export default App
