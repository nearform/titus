import React from 'react'
import axios from 'axios'
import localForage from 'localforage'
import auth0WebAuth from './auth0'

export default class Auth0Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.backendLogin = this.backendLogin.bind(this)
  }

  handleUsername (event) {
    this.setState({ username: event.target.value })
  }

  handlePassword (event) {
    this.setState({ password: event.target.value })
  }

  redirect () {
    auth0WebAuth.authorize()
  }

  backendLogin (e) {
    e.preventDefault()
    if (!this.state.username || !this.state.password) {
      return
    }

    axios
      .post('http://localhost:5000/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localForage.setItem('authentication', response).catch(err => console.error(err))
      })
      .catch(err => console.err(err))
      .then(this.setState({
        username: '',
        password: ''
      }))
  }

  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '24px 0px', padding: '16px', border: '1px solid black' }}>
          <button onClick={() => this.redirect()}>Login on auth0 page</button>
        </div>

        <form onSubmit={this.backendLogin} style={{ display: 'flex', flexDirection: 'column', padding: '16px', border: '1px solid black' }}>
          <input placeholder='username' type='text' value={this.state.username} onChange={this.handleUsername} style={{ margin: '8px 0px' }} />
          <input placeholder='password' type='password' value={this.state.password} onChange={this.handlePassword} style={{ margin: '8px 0px' }} />
          <button type='submit' style={{ margin: '8px 0px' }}>Login via backend</button>
        </form>
      </div>
    )
  }
}
