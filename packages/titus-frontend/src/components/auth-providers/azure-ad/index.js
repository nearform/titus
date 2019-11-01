import { authContext } from './adalConfig'

export default class Authentication {
  logout() {
    this.user = false
    authContext.logOut()
    return true
  }

  isAuthenticated() {
    // localStorage.getItem(authContext.CONSTANTS.STORAGE.IDTOKEN)
    const user = authContext.getCachedUser()
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
