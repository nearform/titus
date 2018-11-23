import React from 'react'
import { oidc } from './oidc'
import { navigate } from '@reach/router'

class Auth0Callback extends React.Component {

  componentDidMount() {
    oidc.parseResponse()
    navigate('/identity/login')
  }

  render() {
      return (<div></div>)
  }
}

export default Auth0Callback
