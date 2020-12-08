import React, { Suspense } from 'react'

import { AuthProvider } from './components/authentication/authentication-context'
import AppRouter from './router'
import Loading from './components/loading'
import RemoteAwsConfig from './components/remote-aws-config'
import ErrorBoundary from './components/error-boundary'

import './styles.css'

const App = () => (
  <RemoteAwsConfig>
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  </RemoteAwsConfig>
)

export default App
