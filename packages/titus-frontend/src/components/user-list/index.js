import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from 'components/authentication/authentication-context'

import config from '../../lib/config'

// This component was created only to test the Cognito user list endpoint
const UserList = () => {
  const { t } = useTranslation()
  const { user } = useContext(AuthContext)
  const [userList, setUserList] = useState([])

  const listUsers = useCallback(async () => {
    const response = await fetch(`${config.serverUrl}/userlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`
      }
    })

    setUserList(await response.json())
  }, [user])

  useEffect(() => {
    listUsers()
  }, [listUsers])

  return (
    <div style={{ marginTop: 20 }}>
      <h1>{t('userListTitle')}</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Enabled</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(u => (
            <tr key={u.username}>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>
                {u.enabled ? (
                  <span role="img" aria-label="enabled">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="disabled">
                    ❌
                  </span>
                )}
              </td>
              <td>{u.status}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
