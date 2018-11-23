import oidcClient from 'oidc-client'
import { navigate } from '@reach/router'

const {
  REACT_APP_OIDC_AUTHORITY,
  REACT_APP_OIDC_CLIENT_ID
} = process.env

class OIDCAuth {
 
  constructor() {
    console.log(process.env)
    const settings = {
      authority: REACT_APP_OIDC_AUTHORITY,
      client_id: REACT_APP_OIDC_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oidc/callback`,
      response_type: 'id_token token',
      scope: 'openid'
    }
    this.client = new oidcClient.OidcClient(settings)
  }

  authenticate() {
    this.client.createSigninRequest({ state: { bar: 15 } }).then((req) => {
      window.location = req.url
    }).catch((err) => {
      console.log(err)
    })
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('oidc_expires_at'))  
    return (expiresAt * 1000) < new Date().getTime()
  }

  logout() {
    localStorage.removeItem('oidc_expires_at')
    localStorage.removeItem('oidc_id_token')
    localStorage.removeItem('oidc_access_token')
    navigate('/auth0/login')
  }
  
  parseResponse() {
    return this.client.processSigninResponse().then((response) => {
      localStorage.setItem('oidc_access_token', response.access_token)
      localStorage.setItem('oidc_id_token', response.id_token)
      localStorage.setItem('oidc_expires_at', response.expires_at)
    })
  }
}

export const oidc = new OIDCAuth()
