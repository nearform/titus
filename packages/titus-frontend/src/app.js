import React, { Suspense } from 'react'

import { AuthProvider } from './components/authentication/authentication-context'
import AppRouter from './router'
import Layout from './components/layout'
import Loading from './components/loading'
import ErrorBoundary from './components/error-boundary'
import './styles.css'

const App = () => (
  <AuthProvider>
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  </AuthProvider>
)

export default App
