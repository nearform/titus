import React from 'react'
import { AuthConsumer } from '../../components/authentication/authentication-context'
import Logo from '../../components/logo'

const Login = () => (
  <AuthConsumer>
    {({ component: Form, ...rest }) => (
      <div className="container">
        <Logo />
        <Form {...rest} />
      </div>
    )}
  </AuthConsumer>
)

export default Login
