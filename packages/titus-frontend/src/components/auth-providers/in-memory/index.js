export default class Authentication {
  authKey = 'titus-auth-key'

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

export { Form as Login } from './form'
