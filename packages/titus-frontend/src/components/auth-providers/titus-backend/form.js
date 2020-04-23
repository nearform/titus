import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../../login-form'
import { loginFormSchema } from '../utils'

export const Form = ({ login, loginError }) => (
  <LoginForm
    login={login}
    schema={loginFormSchema}
    loginError={loginError}
    header={`Please provide Auth0 account details:`}
  />
)

Form.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.string
}

export default Form
