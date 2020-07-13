import React from 'react'

import { AuthProvider } from './components/authentication/authentication-context'
import AppRouter from './router'
import './styles.css'

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
)

export default App
