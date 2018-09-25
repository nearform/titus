import * as yup from 'yup'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import { Button, TextField, Typography } from '@material-ui/core'
import { AuthConsumer } from '../authentication/authentication-context'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '300px',
    width: '100%'
  }
})

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

export const Login = ({ classes }) => (
  <AuthConsumer>
    {({ login }) => (
      <div className={classes.root}>
        <LoginForm
          login={login}
          schema={schema}
          header={`Login:`}
          subheader={`Note: Any username followed by a password with at least four
              characters containing at least one letter or number will work.`}
        />
      </div>
    )}
  </AuthConsumer>
)

export const LoginFormUnstyled = ({
  login,
  classes,
  schema,
  header,
  subheader
}) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        const { username, password } = values
        setSubmitting(false)

        return login({ username, password })
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
        <form noValidate className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="title" gutterBottom>
            {header}
          </Typography>
          <Typography variant="subheading">{subheader}</Typography>
          <TextField
            error={Boolean(touched.username && errors.username)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            required
            id="username"
            name="username"
            label="Username"
            margin="normal"
          />
          {touched.username &&
            errors.username && (
              <Typography color="error" variant="subheading" gutterBottom>
                {errors.username}
              </Typography>
            )}
          <TextField
            error={Boolean(touched.password && errors.password)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
          />
          {touched.password &&
            errors.password && (
              <Typography color="error" variant="subheading" gutterBottom>
                {errors.password}
              </Typography>
            )}
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      )}
    />
  )
}

export const LoginForm = withStyles(styles, { withTheme: true })(
  LoginFormUnstyled
)

export default withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
}))(Login)
