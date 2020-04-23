import { WebAuth } from 'auth0-js'
import config from '../../../config'

export default class Authentication {
  constructor() {
    this.webAuth = new WebAuth({
      domain: config.auth0.domain,
      clientID: config.auth0.clientId,
      redirectUri: `${window.location.origin}/login`,
      audience: config.auth0.audience,
      responseType: 'token id_token',
      scope: 'openid'
    })
  }

  async login() {
    if (this.isAuthenticated()) {
      return { username: 'Dontknow ' }
    }
    // will redirect to Auth0 website, which will then redirect to /login with auth details in url
    this.webAuth.authorize()
  }

  async parseHash() {
    return new Promise(resolve =>
      // potentially parse auth data in url from Auth0
      this.webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          localStorage.setItem('access_token', authResult.accessToken)
          localStorage.setItem('id_token', authResult.idToken)
          localStorage.setItem(
            'expires_at',
            authResult.expiresIn * 1000 + new Date().getTime()
          )
        }
        return resolve(this.isAuthenticated())
      })
    )
  }

  async logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // will redirect to login page, and clean Auth0 cookies
    this.webAuth.logout({
      returnTo: `${window.location.origin}/login`,
      clientID: config.auth0.clientId
    })
  }

  isAuthenticated() {
    try {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
      return new Date().getTime() < expiresAt
    } catch (err) {
      // unparseable state: log out
      this.logout()
      return false
    }
  }

  getUserData() {
    return { username: 'Dontknow' }
  }
}

export { Form as Login } from './form'
