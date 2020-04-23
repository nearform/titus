import React, { useState, useEffect } from 'react'
import { AuthConsumer } from '../../components/authentication/authentication-context'
import { authContext } from '../../components/auth-providers/azure-ad/adalConfig'
import Logo from '../../components/logo'

const Dashboard = () => {
  const [adIdToken, setAdIdToken] = useState(null)

  useEffect(() => {
    if (!authContext) {
      return
    }

    const adIdToken = localStorage.getItem(
      authContext.CONSTANTS.STORAGE.IDTOKEN
    )

    if (adIdToken) {
      setAdIdToken({ adIdToken })
    }
  }, [])

  const testAzureAuth = async () => {
    const headers = {
      Authorization: `Bearer ${adIdToken}`
    }
    try {
      const response = await fetch('/user', { headers })
      const json = await response.json()
      alert(`Azure UPN: ${json.userPrincipalName}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthConsumer>
      {({ logout }) => (
        <div className="container">
          <button className="logout button" onClick={logout}>
            LOGOUT
          </button>
          <Logo />
          <p>
            Develop and Deploy to features quickly using Titus, an Accelerated
            Development & Deployment Stack. Titus is production ready and can be
            deployed to all major cloud providers.
          </p>
          <a
            href="https://nf-titus.netlify.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check out the docs
          </a>
          {adIdToken && (
            <button onClick={testAzureAuth}>Test Azure Authentication</button>
          )}
        </div>
      )}
    </AuthConsumer>
  )
}

export default Dashboard
