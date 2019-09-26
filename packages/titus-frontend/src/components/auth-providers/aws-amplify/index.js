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
  loginData = false

  async login({ username, password }) {
    let login = false
    try {
      login = await Auth.signIn(username, password)
    } catch ({ message }) {
      throw new Error(message)
    }
    this.loginData = login
    return { username: login.username }
  }

  async logout() {
    await Auth.signOut()
    this.loginData = false
    return true
  }

  isAuthenticated() {
    return this.loginData !== false
  }

  getUserData() {
    return this.loginData
  }
}

export { Form as Login } from './form'
