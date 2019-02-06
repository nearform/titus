import React, { Component, Fragment } from 'react'
import auth0 from './Auth0'
import history from '../../history'
import { LoginForm } from '../login'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.')
})

class Auth0Login extends Component {
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
        history.push('/identity/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { classes, auth0 } = this.props

    return (
      <div container spacing={24} className={classes.root}>
        <div item xs={12}>
          <div>
            <div
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={24}
              className={classes.container}
            >
              {auth0.isAuthenticated ? (
                <Fragment>
                  <span variant="title" color="inherit" noWrap>
                    You are logged in.
                  </span>

                  <button
                    variant="contained"
                    color="secondary"
                    disabled={!auth0.isAuthenticated}
                    onClick={() => auth0.logout()}
                  >
                    Log Out
                  </button>
                </Fragment>
              ) : (
                <button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  disabled={auth0.isAuthenticated}
                  onClick={() => this.authorize()}
                >
                  Login Through Auth0
                  {/** ADD MATERIAL LOCK ICON
                    <LockIcon className={classes.rightIcon} />
                  */}
                </button>
              )}
            </div>
          </div>
        </div>
        <div item xs={12}>
          <div>
            {!auth0.isAuthenticated ? (
              <div className={classes.formRoot}>
                <LoginForm
                  login={this.backendLogin}
                  schema={schema}
                  header={`Login Through API Endpoint:`}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Auth0Login
