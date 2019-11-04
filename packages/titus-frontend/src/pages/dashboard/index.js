import React, { Component } from 'react'
import { AuthConsumer } from '../../components/authentication/authentication-context'
import { authContext } from '../../components/auth-providers/azure-ad/adalConfig'

class Dashboard extends Component {
  state = { adIdToken: false }

  componentDidMount() {
    const adIdToken = localStorage.getItem(
      authContext.CONSTANTS.STORAGE.IDTOKEN
    )
    if (adIdToken) {
      this.setState({ adIdToken })
    }
  }

  testAzureAuth = async adIdToken => {
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

  render() {
    const { adIdToken } = this.state

    return (
      <AuthConsumer>
        {({ logout }) => (
          <div className="container">
            <button className="logout button" onClick={logout}>
              LOGOUT
            </button>
            <img
              alt="Titus logo"
              style={{
                width: '100%',
                height: '100%',
                marginBottom: '10vh',
                marginTop: '10vh'
              }}
              src="img/Accel_Logo_Titus.svg"
            />
            <p>
              Develop and Deploy to features quickly using Titus, an Accelerated
              Development & Deployment Stack. Titus is production ready and can
              be deployed to all major cloud providers.
            </p>
            <a
              href="https://nf-titus.netlify.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Check out the docs
            </a>
            {adIdToken && (
              <button onClick={() => this.testAzureAuth(adIdToken)}>
                Test Azure Authentication
              </button>
            )}
          </div>
        )}
      </AuthConsumer>
    )
  }
}

export default Dashboard
