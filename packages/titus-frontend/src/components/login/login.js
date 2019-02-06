import PropTypes from 'prop-types'
import * as yup from 'yup'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AuthConsumer } from '../authentication'
import { LoginForm } from './'

const style = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
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

const Login = ({ classes }) => (
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

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(style)(Login)
