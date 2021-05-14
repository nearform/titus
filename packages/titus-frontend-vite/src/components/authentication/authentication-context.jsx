import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AUTH_PROVIDERS, ROUTES } from 'lib/constants'
import InMemory from 'components/auth-providers/in-memory'
import Titus from 'components/auth-providers/titus-backend'
import AzureAd from 'components/auth-providers/azure-ad'
import AwsAmplify from 'components/auth-providers/aws-amplify'
import Auth0 from 'components/auth-providers/auth0'
import config from 'lib/config'

// AWS, TITUS, MEM, AD, AUTH0
const AUTH_PROVIDER = import.meta.env.VITE_AUTH_PROVIDER || AUTH_PROVIDERS.MEM

const getProvider = t => {
  switch (AUTH_PROVIDER) {
    case AUTH_PROVIDERS.AD:
      return new AzureAd({ config, t })
    case AUTH_PROVIDERS.TITUS:
      return new Titus({ config, t })
    case AUTH_PROVIDERS.AWS:
      return new AwsAmplify({ config, t })
    case AUTH_PROVIDERS['AUTH0']:
      return new Auth0({ config, t })
    case AUTH_PROVIDERS.MEM:
      return new InMemory({ t })
    default:
      return new InMemory({ t })
  }
}

export const AuthContext = React.createContext({})

export const AuthConsumer = AuthContext.Consumer

export const AuthProvider = ({ provider, children }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const authentication = provider || getProvider(t)

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
    provider: AUTH_PROVIDER,
    authentication,
    loginMessage: authentication.header
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.object
}
