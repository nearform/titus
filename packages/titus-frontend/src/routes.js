import React, { lazy, Suspense } from 'react'
import { Route, Router } from 'react-router-dom'
import history from './history'
import Loading from './loading'

const AsyncDashboard = lazy(() => import('./components/dashboard'))

const Routes = () => (
  <Router history={history}>
    <Suspense fallback={<Loading />}>
      <Route path="/">
        <AsyncDashboard />
      </Route>
      {/* INSERT NEW ROUTES HERE */}
    </Suspense>
  </Router>
)

export default Routes
