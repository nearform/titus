import React from 'react'
import { auth0 } from './Auth0'
import { navigate } from '@reach/router'
import {
  Button,
  Paper,
  Grid,
  TextField,
  withStyles,
  Typography
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class Auth0Login extends React.Component {
  static defaultProps = {
    auth0
  }

  state = {
    username: '',
    password: ''
  }

  handleUsername = event => {
    this.setState({ username: event.target.value })
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }

  redirect() {
    auth0.authorize()
  }

  backendLogin = e => {
    e.preventDefault()
    if (!this.state.username || !this.state.password) {
      return
    }

    window
      .fetch(`http://localhost:5000/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(response => {
        console.log('response', response)
        localStorage.setItem('authentication', response)
      })
      .catch(err => console.err(err))
      .then(
        this.setState({
          username: '',
          password: ''
        })
      )
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <Paper>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={24}
            >
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={this.props.auth0.isAuthenticated}
                onClick={() => this.redirect()}
              >
                Login Through Auth0
                <LockIcon className={classes.rightIcon} />
              </Button>
              {this.props.auth0.isAuthenticated ? (
                <React.Fragment>
                  <Typography variant="title" color="inherit" noWrap>
                    You are logged in.
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!this.props.auth0.isAuthenticated}
                    onClick={() =>
                      this.props.auth0.removeSession(() => {
                        navigate('/auth0/login')
                      })
                    }
                  >
                    Log Out
                  </Button>
                </React.Fragment>
              ) : (
                ''
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <form
              noValidate
              onSubmit={this.backendLogin}
              style={{
                padding: '16px'
              }}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
              >
                <TextField
                  id="username"
                  label="Username"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleUsername}
                  margin="normal"
                  required
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handlePassword}
                  margin="normal"
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  Login via backend
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Auth0Login)
