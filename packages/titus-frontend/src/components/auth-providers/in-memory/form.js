import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../../login-form'
import { loginFormSchema } from '../utils'

export const Form = ({ login, loginError }) => (
  <LoginForm
    login={login}
    schema={loginFormSchema}
    loginError={loginError}
    header={`Note: Any username followed by a password with at least four
        characters containing at least one letter or number will work.`}
  />
)

Form.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.string
}

export default Form
