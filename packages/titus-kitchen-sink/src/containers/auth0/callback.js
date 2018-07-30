import React from 'react'
import localForage from 'localforage'
import auth0WebAuth from './auth0'

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
