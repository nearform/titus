import React, { Suspense } from 'react'

import { AuthProvider } from '~/components/authentication/authentication-context'
import { AppRouter } from '~/router'
import Layout from '~/components/layout'
import Loading from '~/components/loading'
import RemoteAwsConfig from '~/components/remote-aws-config'
import ErrorBoundary from '~/components/error-boundary'

import '~/styles.css'

const App = () => (
  <RemoteAwsConfig>
    <AuthProvider>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <AppRouter />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </AuthProvider>
  </RemoteAwsConfig>
)

export default App
