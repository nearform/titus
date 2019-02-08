import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({ login, schema, header }) => (
  <Formik
    initialValues={{
      username: '',
      password: ''
    }}
    validationSchema={schema}
    onSubmit={(values, { setSubmitting }) => {
      const { username, password } = values
      setSubmitting(false)
      if (login) login({ username, password })
    }}
    render={({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => (
      <form noValidate onSubmit={handleSubmit}>
        <h1>{header}</h1>
        <input
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          required
          id="username"
          name="username"
          placeholder="Username"
          margin="normal"
        />
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          required
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          margin="normal"
        />
        {touched && errors.username && (
          <div className="login__error">{errors.username}</div>
        )}
        {touched && errors.password && (
          <div className="login__error">{errors.password}</div>
        )}
        <button disabled={isSubmitting} type="submit">
          Login
        </button>
      </form>
    )}
  />
)

LoginForm.propTypes = {
  login: PropTypes.func,
  schema: PropTypes.object,
  header: PropTypes.string,
  subheader: PropTypes.string
}

export default LoginForm
