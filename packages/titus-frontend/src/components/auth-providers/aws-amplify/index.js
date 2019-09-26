import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

const {
  REACT_APP_AWS_REGION: region,
  REACT_APP_AWS_POOL_ID: userPoolId,
  REACT_APP_AWS_POOL_CLIENT_ID: userPoolWebClientId,
  REACT_APP_AWS_IDENTITY_POOL_ID: identityPoolId
} = process.env

Amplify.configure({
  Auth: { identityPoolId, region, userPoolId, userPoolWebClientId }
})

export default class Authentication {
  user = false

  async login({ username, newPassword, password }) {
    let user = false
    try {
      user = await Auth.signIn(username, password)
      if (newPassword) {
        user = await Auth.completeNewPassword(user, newPassword)
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        throw new Error(
          'Please enter your temporary password and a new password'
        )
      }
      user = await Auth.currentAuthenticatedUser({ bypassCache: false })
    } catch (error) {
      throw new Error(error.message)
    }
    this.user = user
    return { username: user.username }
  }

  async logout() {
    await Auth.signOut()
    this.user = false
    return true
  }

  isAuthenticated() {
    return this.user !== false
  }

  getUserData() {
    return this.user
  }
}

export { Form as Login } from './form'
