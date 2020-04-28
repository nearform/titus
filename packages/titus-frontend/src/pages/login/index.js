import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../components/authentication/authentication-context'
import LoginForm from '../../components/login-form'

const Login = () => {
  const { login, loginMessage, provider, authentication } = useContext(
    AuthContext
  )

  useEffect(() => {
    if (provider === 'AUTH0') {
      authentication
        .parseHash()
        // in case the url contains details, trigger login to resume redirect on dashboard
        .then(isAuthenticated => isAuthenticated && login())
    }
  }, [authentication, login, provider])

  return <LoginForm login={login} header={loginMessage} provider={provider} />
}

export default Login
