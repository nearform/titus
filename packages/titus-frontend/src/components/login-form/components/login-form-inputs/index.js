import T from 'prop-types'
import React, { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'

const LoginFormInputs = ({ allowChangePassword, isSubmitting, loginError }) => (
  <Fragment>
    <Field type="text" name="username" placeholder="Username" required />
    <ErrorMessage name="username" className="login__error" component="div" />
    <Field type="password" name="password" placeholder="Password" required />
    {allowChangePassword &&
    loginError &&
    /Temporary password/.test(loginError) ? (
      <Field
        type="password"
        name="newPassword"
        placeholder="New Password"
        required
      />
    ) : null}
    <ErrorMessage name="password" className="login__error" component="div" />
    {loginError &&
      !allowChangePassword &&
      !/Temporary password/.test(loginError) && (
        <div className="login__error">{loginError}</div>
      )}
    <button className="button" disabled={isSubmitting} type="submit">
      Login
    </button>
  </Fragment>
)

LoginFormInputs.propTypes = {
  allowChangePassword: T.bool,
  isSubmitting: T.bool,
  loginError: T.string
}

export default LoginFormInputs
