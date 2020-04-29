export default class Authentication {
  authKey = 'titus-auth-key'

  header = `Note: Any username followed by a password with at least four
  characters containing at least one letter or number will work.`

  async login({ username }) {
    window.localStorage.setItem(this.authKey, username)
    return { username }
  }

  async logout() {
    window.localStorage.removeItem(this.authKey)
    return true
  }

  isAuthenticated() {
    return Boolean(window.localStorage.getItem(this.authKey))
  }

  getUserData() {
    return { username: window.localStorage.getItem(this.authKey) }
  }
}
