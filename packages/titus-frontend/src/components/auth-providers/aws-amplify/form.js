import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import LoginForm from '../../login-form'

const schema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.')
})

export const Form = ({ login, loginError }) => (
  <LoginForm
    login={login}
    schema={schema}
    loginError={loginError}
    header={`Please provide AWS Cognito account details:`}
    allowChangePassword
  />
)

Form.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.string
}
