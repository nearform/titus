import React from 'react'
import { Grid, withStyles, Paper, Button, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { oidc } from './oidc'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

class OIDCLogin extends React.Component {
  authenticate() {
    oidc.authenticate()
  }

  isAuthenticated() {
    return oidc.isAuthenticated()
  }

  logout() {
    oidc.logout()
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
              {this.isAuthenticated() ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={this.authenticate}
                >
                  Login Through OIDC
                  <LockIcon className={classes.rightIcon} />
                </Button>
              ) : (
                <React.Fragment>
                  <Typography variant="title" color="inherit" noWrap>
                    You are logged in.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!this.isAuthenticated}
                    onClick={this.logout}
                  >
                    Log Out
                  </Button>
                </React.Fragment>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

OIDCLogin.defaultProps = {
  oidc
}

export default withStyles(styles)(OIDCLogin)
