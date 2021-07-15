import React from 'react'
import PropTypes from 'prop-types'

import { AuthProvider, AuthConsumer } from './authentication-context'

export const Auth = ({ children, ...rest }) => (
  <AuthProvider {...rest}>
    <AuthConsumer>
      {({ isAuthenticated }) => children(isAuthenticated)}
    </AuthConsumer>
  </AuthProvider>
)

Auth.propTypes = {
  children: PropTypes.func.isRequired
}

export default Auth
