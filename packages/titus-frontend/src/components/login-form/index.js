import T from 'prop-types'
import React from 'react'
import { Formik } from 'formik'

import { loginFormSchema } from '../auth-providers/utils'
import Logo from '../logo'

import LoginFormInputs from './components/login-form-inputs'

const LoginForm = ({
  allowChangePassword,
  login,
  header,
  loginError,
  powerMessage,
  form
}) => {
  let RenderForm = form ? form : LoginFormInputs
  // validation schema should only be applied for the default form inputs
  let validationSchema =
    RenderForm === LoginFormInputs ? loginFormSchema : undefined
  return (
    <div className="container">
      <Logo />
      <Formik
        initialValues={{
          username: '',
          password: '',
          newPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (login) login(values)
          resetForm(values)
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <header>{header}</header>
            <RenderForm
              allowChangePassword={allowChangePassword}
              isSubmitting={isSubmitting}
              loginError={loginError}
            />
            <sub>{powerMessage}</sub>
          </form>
        )}
      </Formik>
    </div>
  )
}

LoginForm.defaultProps = {
  form: LoginFormInputs
}

LoginForm.propTypes = {
  login: T.func,
  form: T.elementType,
  header: T.string,
  powerMessage: T.string,
  loginError: T.string
}

export default LoginForm
