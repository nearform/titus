import { Button, TextField, Typography, withStyles } from '@material-ui/core'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '300px',
    width: '100%'
  }
})

const LoginForm = ({ login, classes, schema, header, subheader }) => (
  <Formik
    initialValues={{
      username: '',
      password: ''
    }}
    validationSchema={schema}
    onSubmit={(values, { setSubmitting }) => {
      const { username, password } = values
      setSubmitting(false)

      return login({ username, password })
    }}
    render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func,
  schema: PropTypes.object,
  header: PropTypes.string,
  subheader: PropTypes.string
}

export default withStyles(styles)(LoginForm)
