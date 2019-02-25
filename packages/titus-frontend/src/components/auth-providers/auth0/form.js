import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * This form will be used:
 * 1- when user is not authenticated yet, url is /login
 * 2- whn Auth0 invokes it as a callback, with authentication details. Url is /login?#access_token=...
 */
export const Form = ({ login, authentication }) => {
  useEffect(() => {
    authentication
      .parseHash()
      // in case the url contains details, trigger login to resume redirect on dashboard
      .then(isAuthenticated => isAuthenticated && login())
  })
  return (
    <button className="button" onClick={login}>
      Login through Auth0
    </button>
  )
}

Form.propTypes = {
  login: PropTypes.func.isRequired
}
