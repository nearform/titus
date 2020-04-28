import { getAuthContext } from './adalConfig'

export default class Authentication {
  constructor({ config } = {}) {
    this.authContext = getAuthContext(config)
  }

  logout() {
    this.user = false
    this.authContext.logOut()
    return true
  }

  isAuthenticated() {
    const user = this.authContext.getCachedUser()

    if (user) {
      const { username } = user
      this.user = { username }
      return true
    }
    return false
  }

  getUserData() {
    return this.user
  }
}

export const Login = () => null
