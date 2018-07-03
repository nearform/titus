import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'



const styles = theme => ({
  form: {
    display      : 'flex',
    flexDirection: 'column',
    margin       : 'auto',
    maxWidth     : '300px',
    width        : '100%',
  }
});

class Login extends PureComponent {
  render() {
    let { classes, className, onSubmit } = this.props;
    
    return (

      <form className = { classNames(classes.form, className) } onSubmit={onSubmit}>
        <Typography variant="title" gutterBottom>Login:</Typography>
        <TextField
          id="username"
          label="User name"
          margin="normal"
        />

        <TextField
          id="password"
          label="Password"
          type='password'
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login)