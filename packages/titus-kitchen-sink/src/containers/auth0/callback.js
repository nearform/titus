import React from 'react'
import PropTypes from 'prop-types'
import auth0 from 'auth0-js'
import localForage from "localforage"

export default class Auth0Callback extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      authentication: null,
      token: null,
      err: null
    }
  }

  async componentDidMount () {
    const auth0WebAuth = new auth0.WebAuth({
      domain: 'p16.eu.auth0.com',
      clientID: '678g01xXZy32XNizNfFB3czLVubRA41E',
      redirectUri: 'http://localhost:3000/auth0/callback',
      audience: 'http://localhost:5000',
      responseType: 'token id_token',
      scope: 'openid'
    })

    auth0WebAuth.parseHash((err, authRes) => {
      if (err) {
        this.setState({
          authentication: null,
          token: null,
          err: err
        })

        return console.error(err)
      }

      localForage.setItem('authentication', authRes)
        .then(() => {
          window.location.replace('/')
        })
        .catch(err => console.error(err))
    })
  }

  render () {
    return (
      <div>
        <div>Callback!</div>
        {this.state.err && <div>Error: {JSON.stringify(this.state.err, null, 2)}</div>}
      </div>
    )
  }
}

