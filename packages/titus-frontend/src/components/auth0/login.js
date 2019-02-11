import React, { Component, Fragment } from 'react'
import auth0 from './auth0'
import history from '../../history'
import LoginForm from '../login/components/login-form'
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
    const { auth0 } = this.props

    return (
      <div className="container">
        <img alt="Titus logo" src="img/logo-pos.svg" />

        {auth0.isAuthenticated ? (
          <Fragment>
            <h1>You are logged in.</h1>

            <button
              disabled={!auth0.isAuthenticated}
              onClick={() => auth0.logout()}
            >
              Log Out
            </button>
          </Fragment>
        ) : (
          <button
            disabled={auth0.isAuthenticated}
            onClick={() => this.authorize()}
          >
            Login Through Auth0
          </button>
        )}
        {!auth0.isAuthenticated ? (
          <LoginForm
            login={this.backendLogin}
            schema={schema}
            header={`Login Through API Endpoint`}
          />
        ) : null}
      </div>
    )
  }
}

export default Auth0Login
