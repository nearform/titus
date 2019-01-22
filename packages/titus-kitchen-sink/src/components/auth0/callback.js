import React, { Component } from 'react'
import auth0 from './Auth0'
import { navigate } from '@reach/router'

class Auth0Callback extends Component {
  state = {
    authentication: null,
    token: null,
    err: null
  }

  componentDidMount() {
    auth0.parseHash(err => {
      if (err) {
        this.setState({ err })
      }

      navigate('/identity/login')
    })
  }

  render() {
    return (
      <div>
        {this.state.err && (
          <div>Error: {JSON.stringify(this.state.err, null, 2)}</div>
        )}
      </div>
    )
  }
}

export default Auth0Callback
