import React, { useContext, useState } from 'react'
import { AuthContext } from 'components/authentication/authentication-context'

const AuthzCheck = () => {
  const { user } = useContext(AuthContext)
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState('not checked')
  const checkAuthz = async user => {
    console.log(user)
    const headers = {
      Authorization: `Bearer ${user.accessToken}`
    }
    try {
      setIsAuthorizedAdmin('checking...')
      const response = await fetch('/admin-authzcheck', { headers })
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
      <button onClick={() => checkAuthz(user)}>
        Authorization Check ({isAuthorizedAdmin})
      </button>
    </div>
  )
}

export default AuthzCheck
