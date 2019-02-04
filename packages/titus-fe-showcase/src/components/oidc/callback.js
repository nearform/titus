import React, { Component } from 'react'
import { oidc } from './oidc'
import { navigate } from '@reach/router'

class Auth0Callback extends Component {
  componentDidMount() {
    oidc.parseResponse()
    navigate('/identity/login')
  }

  render() {
    return <div />
  }
}

export default Auth0Callback
