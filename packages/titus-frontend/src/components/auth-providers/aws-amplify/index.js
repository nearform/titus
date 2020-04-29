import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

import i18n from '../../../i18n'

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

  header = i18n.t('header.aws')
  powerMessage = `Powered by AWS Amplify`

  async login({ username, newPassword, password }) {
    let user = false
    try {
      user = await Auth.signIn(username, password)
      if (newPassword) {
        user = await Auth.completeNewPassword(user, newPassword)
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        throw new Error(i18n.t('errors.tempPassword'))
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
