export class Authentication {
  authKey = 'titus-auth-key'

  login({ username }) {
    window.localStorage.setItem(this.authKey, username)

    return new Promise(resolve => resolve({ username }))
  }

  logout() {
    window.localStorage.removeItem(this.authKey)

    return new Promise(resolve => resolve(true))
  }

  isAuthenticated() {
    return Boolean(window.localStorage.getItem(this.authKey))
  }

  getUserData() {
    return { username: window.localStorage.getItem(this.authKey) }
  }
}
