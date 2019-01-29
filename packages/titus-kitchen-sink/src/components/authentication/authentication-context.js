import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = React.createContext({})

export const AuthConsumer = AuthContext.Consumer

class AuthProvider extends Component {
  state = {
    isAuthenticated: this.props.authentication.isAuthenticated(),
    user: this.props.authentication.getUserData()
  }

  login = ({ username, password }) =>
    this.props.authentication.login({ username, password }).then(user => {
      this.setState({
        isAuthenticated: this.props.authentication.isAuthenticated(),
        user
      })
    })

  logout = () =>
    this.props.authentication.logout().then(result => {
      result &&
        this.setState({
          isAuthenticated: this.props.authentication.isAuthenticated(),
          user: null
        })
    })

  getProps = () => ({
    login: this.login,
    logout: this.logout,
    isAuthenticated: this.props.authentication.isAuthenticated(),
    user: this.props.authentication.getUserData()
  })

  render() {
    const { children } = this.props

    return (
      <AuthContext.Provider value={this.getProps()}>
        {children}
      </AuthContext.Provider>
    )
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.object
}

export default AuthProvider
