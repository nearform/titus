import i18n from '../../../i18n'

export default class Authentication {
  authKey = 'titus-auth-key'

  header = i18n.t('header.memory')

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
