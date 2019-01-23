import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider, AuthConsumer, Authentication } from './'

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
