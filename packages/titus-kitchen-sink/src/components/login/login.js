import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import { Button, TextField, Typography } from '@material-ui/core'
import { AuthConsumer } from '../authentication/authentication-context'

const styles = theme => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '300px',
    width: '100%'
  }
})

export const Login = ({ classes, submitLogin }) => (
  <AuthConsumer>
    {({ login }) => (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validate={values => {
          let errors = {}

          if (!values.username) {
            errors.username = 'Username is required.'
          }

          if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i.test(values.password)
          ) {
            errors.password =
              'Password must be at least 4 characters long and contain at least one letter and one number.'
          }

          return errors
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const { username, password } = values

          login({ username, password })
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
          <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant='title' gutterBottom>
                Login:
              </Typography>
              <Typography variant='subheading'>
                Note: Any username followed by a password with at least four
                characters containing at least one letter or number will work.
              </Typography>
              <TextField
                error={Boolean(touched.username && errors.username)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                required
                id='username'
                name='username'
                label='Username'
                margin='normal'
              />
              {touched.username &&
                errors.username && (
                <Typography color='error' variant='subheading' gutterBottom>
                  {errors.username}
                </Typography>
              )}
              <TextField
                error={Boolean(touched.password && errors.password)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
                id='password'
                name='password'
                label='Password'
                type='password'
                margin='normal'
              />
              {touched.password &&
                errors.password && (
                <Typography color='error' variant='subheading' gutterBottom>
                  {errors.password}
                </Typography>
              )}
              <Button
                disabled={isSubmitting}
                variant='contained'
                color='primary'
                type='submit'
              >
                Login
              </Button>
            </form>
          </div>
        )}
      />
    )}
  </AuthConsumer>
)

Login.propTypes = {
  classes: PropTypes.object,
  submitLogin: PropTypes.func
}

Login.defaultProps = {
  classes: {}
}

export default withStyles(styles, { withTheme: true })(Login)
