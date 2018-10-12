import React from 'react'
import PropTypes from 'prop-types'

export const AuthContext = React.createContext({})

export const AuthConsumer = AuthContext.Consumer

export class AuthProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    authentication: PropTypes.object
  }

  state = {
    isAuthenticated: this.props.authentication.isAuthenticated(),
    user: this.props.authentication.getUserData()
  }

  login = ({ username, password }) => {
    return this.props.authentication
      .login({ username, password })
      .then(user => {
        this.setState({
          isAuthenticated: this.props.authentication.isAuthenticated(),
          user
        })
      })
  }

  logout = () => {
    return this.props.authentication.logout().then(result => {
      result &&
        this.setState({
          isAuthenticated: this.props.authentication.isAuthenticated(),
          user: null
        })
    })
  }

  getProps = () => {
    return {
      login: this.login,
      logout: this.logout,
      isAuthenticated: this.props.authentication.isAuthenticated(),
      user: this.props.authentication.getUserData()
    }
  }

  render() {
    const { children } = this.props

    return (
      <AuthContext.Provider value={this.getProps()}>
        {children}
      </AuthContext.Provider>
    )
  }
}
