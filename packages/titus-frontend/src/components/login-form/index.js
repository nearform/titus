import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'

const LoginForm = ({
  allowChangePassword,
  login,
  schema,
  header,
  loginError
}) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
      newPassword: ''
    }}
    validationSchema={schema}
    onSubmit={(values, { resetForm }) => {
      if (login) login(values)
      resetForm(values)
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <form noValidate onSubmit={handleSubmit}>
        <h1>{header}</h1>
        <Field type="text" name="username" placeholder="Username" required />
        <ErrorMessage
          name="username"
          className="login__error"
          component="div"
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {allowChangePassword &&
        loginError &&
        /temporary password/.test(loginError) ? (
          <Field
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
          />
        ) : null}
        <ErrorMessage
          name="password"
          className="login__error"
          component="div"
        />
        {loginError && <div className="login__error">{loginError}</div>}
        <button className="button" disabled={isSubmitting} type="submit">
          Login
        </button>
      </form>
    )}
  </Formik>
)

LoginForm.propTypes = {
  login: PropTypes.func,
  schema: PropTypes.object,
  header: PropTypes.string,
  loginError: PropTypes.string
}

export default LoginForm
