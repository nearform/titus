import React from 'react'
import { auth0 } from './Auth0'
import { navigate } from '@reach/router'
import { Button, Paper, Grid, withStyles, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { LoginForm } from '../login/login'
import * as yup from 'yup'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  formRoot: {
    padding: theme.spacing.unit * 5
  }
})

const schema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.')
})

class Auth0Login extends React.Component {
  static defaultProps = {
    auth0
  }

  authorize() {
    this.props.auth0.authorize()
  }

  backendLogin = async ({ username, password }) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const authResult = await response.json()
      if (authResult && authResult.access_token && authResult.id_token) {
        localStorage.setItem('access_token', authResult.access_token)
        localStorage.setItem('id_token', authResult.id_token)
        localStorage.setItem(
          'expires_at',
          authResult.expires_in * 1000 + new Date().getTime()
        )
        navigate('/auth0/login')
      }
    } catch (error) {
      console.error(error)
    }
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
              className={classes.container}
            >
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
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  disabled={this.props.auth0.isAuthenticated}
                  onClick={() => this.authorize()}
                >
                  Login Through Auth0
                  <LockIcon className={classes.rightIcon} />
                </Button>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {!this.props.auth0.isAuthenticated ? (
              <div className={classes.formRoot}>
                <LoginForm
                  login={this.backendLogin}
                  schema={schema}
                  header={`Login Through API Endpoint:`}
                />
              </div>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Auth0Login)
