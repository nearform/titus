import React, { lazy, Suspense } from 'react'
import Auth from './components/authentication/auth'
import Loading from './loading'
import './styles.css'

const AsyncRoutes = lazy(() => import('./routes'))
const AsyncLogin = lazy(() => import('./components/login'))

const App = () => (
  <Suspense fallback={<Loading />}>
    <Auth>
      {isAuthenticated => (isAuthenticated ? <AsyncRoutes /> : <AsyncLogin />)}
    </Auth>
  </Suspense>
)

export default App
