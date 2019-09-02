import React from 'react'
import { AuthConsumer } from '../../components/authentication/authentication-context'

const Login = () => (
  <AuthConsumer>
    {({ component: Form, ...rest }) => (
      <div className="container">
        <img alt="Titus logo" src="img/Accel_Logo_Titus.svg" />
        <Form {...rest} />
      </div>
    )}
  </AuthConsumer>
)

export default Login
