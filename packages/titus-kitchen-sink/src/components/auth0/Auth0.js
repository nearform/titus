import { WebAuth } from 'auth0-js'

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE
} = process.env

class Auth0 {
  constructor() {
    this.webAuth = new WebAuth({
      domain: REACT_APP_AUTH0_DOMAIN,
      clientID: REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth0/callback`,
      audience: REACT_APP_AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid'
    })
  }

  authorize() {
    this.webAuth.authorize()
  }

  parseHash(cb) {
    this.webAuth.parseHash((err, authResult) => {
      if (err) {
        console.log(err)
        return cb(err)
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        return this.setSession(authResult, cb)
      }

      return cb()
    })
  }

  setSession(authResult, cb) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    cb()
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    this.webAuth.logout({
      returnTo: `${window.location.origin}/identity/login`,
      clientID: REACT_APP_AUTH0_CLIENT_ID
    })
  }

  get isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

export const auth0 = new Auth0()
