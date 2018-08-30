import React from 'react'
import PropTypes from 'prop-types'

export const AuthContext = React.createContext({})

class Authentication {
  authKey = 'titus-auth-key'

  login ({ username, password }) {
    window.localStorage.setItem(this.authKey, username)

    return new Promise(resolve => resolve({ username }))
  }

  logout () {
    window.localStorage.removeItem(this.authKey)
  }

  isAuthenticated () {
    return Boolean(window.localStorage.getItem(this.authKey))
  }

  getUserData () {
    return { username: window.localStorage.getItem(this.authKey) }
  }
}

class AuthProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  authentication = new Authentication()

  state = {
    isAuthenticated: this.authentication.isAuthenticated(),
    user: this.authentication.getUserData()
  }

  login = ({ username, password }) => {
    this.authentication.login({ username, password }).then(user => {
      this.setState({
        isAuthenticated: this.authentication.isAuthenticated(),
        user
      })
    })
  }

  logout = () => {
    this.setState(
      {
        isAuthenticated: this.authentication.isAuthenticated(),
        user: null
      },
      this.authentication.logout()
    )
  }

  getProps = () => {
    return {
      login: this.login,
      logout: this.logout,
      isAuthenticated: this.authentication.isAuthenticated(),
      user: this.authentication.getUserData()
    }
  }

  render () {
    const { children } = this.props

    return (
      <AuthContext.Provider value={this.getProps()}>
        {children}
      </AuthContext.Provider>
    )
  }
}

export const Auth = ({ children }) => (
  <AuthProvider>
    <AuthContext.Consumer>
      {({ isAuthenticated }) => children(isAuthenticated)}
    </AuthContext.Consumer>
  </AuthProvider>
)

Auth.propTypes = {
  children: PropTypes.func.isRequired
}

export default Auth
