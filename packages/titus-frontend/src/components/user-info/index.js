import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../config'
import { AuthContext } from '../authentication/authentication-context'

// This component was created only to test the auth endpoint
const UserInfo = () => {
  const { t } = useTranslation()
  const { user } = useContext(AuthContext)
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    async function run() {
      const response = await fetch(`${config.serverUrl}/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`
        }
      })

      setLoggedUser(await response.json())
    }

    run()
  }, [user])

  return (
    loggedUser && (
      <div style={{ marginTop: 20 }}>
        <h1>{t('userInfoTitle')}</h1>
        <div>
          {Object.entries(loggedUser).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default UserInfo
