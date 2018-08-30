import React from 'react'
import PropTypes from 'prop-types'
import { Authentication } from './authentication'
import { AuthProvider, AuthConsumer } from './authentication-context'

const authentication = new Authentication()

export const Auth = ({ children }) => (
  <AuthProvider authentication={authentication}>
    <AuthConsumer>
      {({ isAuthenticated }) => children(isAuthenticated)}
    </AuthConsumer>
  </AuthProvider>
)

Auth.propTypes = {
  children: PropTypes.func.isRequired
}

export default Auth
