import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import jwtDecode from 'jwt-decode'

export default class Authentication {
  authConfig = null

  constructor({ config, t } = {}) {
    this.authConfig = {
      identityPoolId: config.aws.identityPoolId,
      region: config.aws.region,
      userPoolId: config.aws.userPoolId,
      userPoolWebClientId: config.aws.userPoolWebClientId
    }

    Amplify.configure({
      Auth: this.authConfig
    })

    this.header = t('header.aws')
    this.powerMessage = t('powerMessages.aws')
    this.t = t
  }

  user = false

  async login({ username, newPassword, password }) {
    let user = false
    try {
      user = await Auth.signIn(username, password)
      if (newPassword) {
        user = await Auth.completeNewPassword(user, newPassword)
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        throw new Error(this.t('errors.tempPassword'))
      }
      user = await Auth.currentAuthenticatedUser({ bypassCache: false })
    } catch (error) {
      throw new Error(error.message)
    }
    this.user = user

    return this.getUserData()
  }

  async logout() {
    await Auth.signOut()
    this.user = false
    return true
  }

  isAuthenticated() {
    const regex = /^CognitoIdentityServiceProvider/
    const awsKey = Object.keys(localStorage)
      .filter(
        e => regex.test(e) && e.includes(this.authConfig.userPoolWebClientId)
      )
      .find(entry => entry.endsWith('.idToken'))
    return !!awsKey
  }

  getUserData() {
    const regex = /^CognitoIdentityServiceProvider/
    const awsKey = Object.keys(localStorage)
      .filter(
        e => regex.test(e) && e.includes(this.authConfig.userPoolWebClientId)
      )
      .find(entry => entry.endsWith('.idToken'))

    const idToken = localStorage.getItem(awsKey)
    if (!idToken) {
      return this.user || false
    }
    const decodedToken = jwtDecode(idToken)
    return {
      username: decodedToken['cognito:username'],
      email: decodedToken.email,
      idToken
    }
  }
}
