import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

export default class Authentication {
  constructor({ config } = {}) {
    Amplify.configure({
      Auth: {
        identityPoolId: config.aws.identityPoolId,
        region: config.aws.region,
        userPoolId: config.aws.userPoolId,
        userPoolWebClientId: config.aws.userPoolWebClientId
      }
    })
  }

  user = false

  header = `Please provide AWS Cognito account details:`

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
    const regex = /^CognitoIdentityServiceProvider/
    const awsKeys = Object.keys(localStorage).filter(e => regex.test(e))
    return awsKeys.length > 0
  }

  getUserData() {
    return this.user
  }
}
