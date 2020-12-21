import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from 'lib/router'
import { AuthProvider } from 'components/authentication/authentication-context'
import Loading from 'components/loading'
import RemoteAwsConfig from 'components/remote-aws-config'
import ErrorBoundary from 'components/error-boundary'

import 'styles.css'

const App = () => (
  <RemoteAwsConfig>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <AppRouter />
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </RemoteAwsConfig>
)

export default App
