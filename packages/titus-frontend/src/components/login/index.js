import React from 'react'
import * as yup from 'yup'
import { AuthConsumer } from '../authentication'
import LoginForm from './components/login-form'

const schema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i,
      'Password must be at least 4 characters long and contain at least one letter and one number.'
    )
    .required('Password is required.')
})

const Login = () => (
  <AuthConsumer>
    {({ login }) => (
      <div className="container">
        <img alt="Titus logo" src="img/logo-pos.svg" />
        <LoginForm
          login={login}
          schema={schema}
          header={`Note: Any username followed by a password with at least four
              characters containing at least one letter or number will work.`}
        />
      </div>
    )}
  </AuthConsumer>
)

export default Login
