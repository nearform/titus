import React from 'react'
import { AuthConsumer } from '../../components/authentication/authentication-context'

const Login = () => (
  <AuthConsumer>
    {({ component: Form, ...rest }) => (
      <div className="container">
        <img
          alt="Titus logo"
          src="img/Accel_Logo_Titus.svg"
          style={{
            width: '100%',
            height: '100%',
            'margin-bottom': '10vh',
            'margin-top': '10vh'
          }}
        />
        <Form {...rest} />
      </div>
    )}
  </AuthConsumer>
)

export default Login
