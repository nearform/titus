import React from 'react'
import PropTypes from 'prop-types'
import auth0 from 'auth0-js'

export default class Auth0Login extends React.Component {
  componentDidMount () {
    const auth0WebAuth = new auth0.WebAuth({
      domain: 'p16.eu.auth0.com',
      clientID: '678g01xXZy32XNizNfFB3czLVubRA41E',
      redirectUri: 'http://localhost:3000/auth0/callback',
      audience: 'http://localhost:5000',
      responseType: 'token id_token',
      scope: 'openid'
    })

    auth0WebAuth.authorize()
  }

  render () {
    return (
      <div />
    )
  }
}
