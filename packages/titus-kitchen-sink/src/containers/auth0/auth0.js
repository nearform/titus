import auth0 from 'auth0-js'

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE
} = process.env

let auth0WebAuth = {}

if (!REACT_APP_AUTH0_DOMAIN || !REACT_APP_AUTH0_CLIENT_ID) {
  console.error('Missing configuration for Auth0')
} else {
  auth0WebAuth = new auth0.WebAuth({
    domain: REACT_APP_AUTH0_DOMAIN,
    clientID: REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: 'http://localhost:3000/auth0/callback',
    audience: REACT_APP_AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid'
  })
}

export default auth0WebAuth
