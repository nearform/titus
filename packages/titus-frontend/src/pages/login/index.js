import React, { useContext } from 'react'
import { AuthContext } from '../../components/authentication/authentication-context'
import LoginForm from '../../components/login-form'

const Login = () => {
  const { login, loginMessage } = useContext(AuthContext)
  return <LoginForm login={login} header={loginMessage} />
}

export default Login
