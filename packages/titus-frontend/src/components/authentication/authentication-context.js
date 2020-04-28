import React, { useState } from 'react'
import PropTypes from 'prop-types'
import history from '../../history'
import { ROUTES } from '../../constants'
import InMemory from '../auth-providers/in-memory'

// TODO:: Generate a new auth based off env variables here
const authentication = new InMemory()

export const AuthContext = React.createContext({})

export const AuthConsumer = AuthContext.Consumer

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(
    authentication.isAuthenticated()
  )
  const [user, setUser] = useState(authentication.getUserData())
  const [loginError, setLoginError] = useState(null)
  const [logoutError, setLogoutError] = useState(null)

  const login = async data => {
    try {
      setLoginError(null)
      const user = await authentication.login(data)
      if (user) {
        setAuthenticated(authentication.isAuthenticated())
        setUser(user)
        history.push(ROUTES.DASHBOARD)
      }
    } catch (err) {
      setLoginError(err.message)
    }
  }

  const logout = async () => {
    try {
      setLogoutError(null)
      const result = await authentication.logout()
      if (result) {
        setAuthenticated(false)
        setUser(null)
        history.push(ROUTES.LOGIN)
      }
    } catch (err) {
      setLogoutError(err.message)
    }
  }

  const context = {
    login,
    logout,
    loginError,
    logoutError,
    isAuthenticated,
    user,
    authentication,
    loginMessage: authentication.header
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.object
}
