import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

const {
  REACT_APP_AWS_REGION: region,
  REACT_APP_AWS_POOL_ID: userPoolId,
  REACT_APP_AWS_POOL_CLIENT_ID: userPoolWebClientId
} = process.env

Amplify.configure({
  Auth: { region, userPoolId, userPoolWebClientId }
})

export default class Authentication {
  async login({ username, password }) {
    Auth.signIn(username, password)
      .then(success => console.log('successful sign in'))
      .catch(err => console.log(err))
  }

  async parseHash() {}

  async logout() {}

  isAuthenticated() {}

  getUserData() {}
}

export { Form as Login } from './form'
