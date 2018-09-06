import React from 'react'
import { auth0 } from './Auth0'
import { navigate } from '@reach/router'

class Auth0Callback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authentication: null,
      token: null,
      err: null
    }
  }
  async componentDidMount() {
    auth0.parseHash(err => {
      if (err) {
        console.error(err)
      }

      navigate('/auth0/login')
    })
  }
  render() {
    return (
      <div>
        <div>Callback!</div>
        {this.state.err && (
          <div>Error: {JSON.stringify(this.state.err, null, 2)}</div>
        )}
      </div>
    )
  }
}

export default Auth0Callback
