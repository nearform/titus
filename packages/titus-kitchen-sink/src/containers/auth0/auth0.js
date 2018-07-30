import auth0 from 'auth0-js'

const auth0WebAuth = new auth0.WebAuth({
  domain: 'p16.eu.auth0.com',
  clientID: '678g01xXZy32XNizNfFB3czLVubRA41E',
  redirectUri: 'http://localhost:3000/auth0/callback',
  audience: 'http://localhost:5000',
  responseType: 'token id_token',
  scope: 'openid'
})

export default auth0WebAuth
