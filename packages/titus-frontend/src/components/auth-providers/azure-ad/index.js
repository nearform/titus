import { getAuthContext } from './adalConfig'

export default class Authentication {
  constructor({ config, t } = {}) {
    this.authContext = getAuthContext(config)
    this.header = t('header.azure')
    this.powerMessage = t('powerMessages.azure')
  }

  // Assuming we won't ever see the Login screen with AD
  // As we use the directory login and bypass straight to our
  // private routes

  logout() {
    this.user = false
    this.authContext.logOut()
    return true
  }

  isAuthenticated() {
    const user = this.authContext ? this.authContext.getCachedUser() : null
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
