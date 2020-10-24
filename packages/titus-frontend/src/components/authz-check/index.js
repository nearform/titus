import React, { useContext, useState } from 'react'
import { AuthContext } from 'components/authentication/authentication-context'

const AuthzCheck = () => {
  const { user } = useContext(AuthContext)
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState('not checked')
  const checkAuthz = async user => {
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
      'X-authz-id': user.idToken
    }
    try {
      setIsAuthorizedAdmin('checking...')
      const response = await fetch('/authzcheck', { headers })
      const json = await response.json()
      if (json.isAdmin) {
        setIsAuthorizedAdmin('confirmed authorized admin')
      } else {
        setIsAuthorizedAdmin('not authorized admin')
      }
    } catch (e) {
      setIsAuthorizedAdmin('not authorized admin')
      console.log(e)
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h1>Authorization Check</h1>
      <button onClick={() => checkAuthz(user)}>{isAuthorizedAdmin}</button>
    </div>
  )
}

export default AuthzCheck
