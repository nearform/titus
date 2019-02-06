import React, { lazy, Suspense } from 'react'
import { Router } from '@reach/router'
import Loading from './loading'

const AsyncDashboard = lazy(() => import('./components/dashboard'))

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <AsyncDashboard path="/" />
      {/* INSERT NEW ROUTES HERE */}
    </Router>
  </Suspense>
)

export default Routes
