import React from 'react'
import { oidc } from './oidc'
import { navigate } from '@reach/router'

class Auth0Callback extends React.Component {

  componentDidMount() {
    oidc.parseResponse()
    navigate('/auth0/login')
  }

  render() {
      return (<div></div>)
  }
}

export default Auth0Callback
