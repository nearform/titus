import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AuthContext } from '~/components/authentication/authentication-context'

// This component was created only to test the Cognito user list endpoint
const UserList = () => {
  const { t } = useTranslation()
  const { user } = useContext(AuthContext)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    async function run() {
      const response = await fetch('/api/v1/userlist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`
        }
      })

      setUserList(await response.json())
    }

    run()
  }, [user])

  return (
    userList.length && (
      <div style={{ marginTop: '50px' }}>
        <h1>{t('userListTitle')}</h1>
        <div>
          {userList.map(user => (
            <div key={user.username} style={{ marginBottom: '10px' }}>
              <strong>Email: </strong> {user.email} <br />
              <strong>User: </strong> {user.username}
              <br />
              <strong>Enabled: </strong> {user.enabled}
              <br />
              <strong>Status: </strong> {user.status}
              <br />
              <strong>CreatedAt: </strong> {user.createdAt}
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default UserList
