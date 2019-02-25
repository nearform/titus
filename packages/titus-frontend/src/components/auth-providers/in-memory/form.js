import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import LoginForm from '../../login-form'

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

export const Form = ({ login, loginError }) => (
  <LoginForm
    login={login}
    schema={schema}
    loginError={loginError}
    header={`Note: Any username followed by a password with at least four
        characters containing at least one letter or number will work.`}
  />
)

Form.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.string
}
