import T from 'prop-types'
import React, { Fragment } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <>
      <Logo />
      <Formik
        initialValues={{
          username: '',
          password: '',
          newPassword: ''
        }}
        validationSchema={loginFormSchema}
        onSubmit={(values, { resetForm }) => {
          if (login) login(values)
          resetForm(values)
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <h1>{header}</h1>
            {provider !== 'AUTH0' && (
              <>
                <Field
                  type="text"
                  name="username"
                  placeholder={t('username')}
                  required
                />
                <ErrorMessage
                  name="username"
                  className="login__error"
                  component="div"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder={t('password')}
                  required
                />
                {allowChangePassword &&
                loginError &&
                /temporary password/.test(loginError) ? (
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder={t('newPassword')}
                    required
                  />
                ) : null}
                <ErrorMessage
                  name="password"
                  className="login__error"
                  component="div"
                />
              </>
            )}
            {loginError && <div className="login__error">{loginError}</div>}
            <button className="button" disabled={isSubmitting} type="submit">
              {`${t('login')} ${provider === 'AUTH0' ? t('withAuth0') : ''}`}
            </button>
          </form>
        )}
      </Formik>
    </>
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
