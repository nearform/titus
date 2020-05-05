import T from 'prop-types'
import React, { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

const LoginFormInputs = ({ allowChangePassword, isSubmitting, loginError }) => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <Field type="text" name="username" placeholder={t('username')} required />
      <ErrorMessage name="username" className="login__error" component="div" />
      <Field
        type="password"
        name="password"
        placeholder={t('password')}
        required
      />
      {allowChangePassword &&
      loginError &&
      /Temporary password/.test(loginError) ? (
        <Field
          type="password"
          name="newPassword"
          placeholder={t('newPassword')}
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
        {t('login')}
      </button>
    </Fragment>
  )
}

LoginFormInputs.propTypes = {
  allowChangePassword: T.bool,
  isSubmitting: T.bool,
  loginError: T.string
}

export default LoginFormInputs
