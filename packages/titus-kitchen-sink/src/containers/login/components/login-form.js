import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

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

class Login extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = event.target.elements

    if (username.value && password.value) {
      this.props.onSubmit({
        username: username.value,
        password: password.value
      })
    }
  }
  render () {
    let { classes, className } = this.props

    return (
      <div className={classNames(classes.wrapper, className)}>
        <form className={classNames(classes.form)} onSubmit={this.handleSubmit}>
          <Typography variant='title' gutterBottom>Login:</Typography>
          <Typography variant='subheading'>
            Note: You can enter any value into the fields below.
          </Typography>
          <TextField required id='username' name='username' label='User name' margin='normal' />
          <TextField required id='password' name='password' label='Password' type='password' margin='normal' />
          <Button variant='contained' color='primary' type='submit'>Login</Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login)
