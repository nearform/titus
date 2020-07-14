import React, { Suspense } from 'react'
import { AuthProvider } from './components/authentication/authentication-context'
import AppRouter from './router'
import Layout from './components/layout'
import Loading from './components/loading'
import './styles.css'

const App = () => (
  <AuthProvider>
    <Layout>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>
    </Layout>
  </AuthProvider>
)

export default App
