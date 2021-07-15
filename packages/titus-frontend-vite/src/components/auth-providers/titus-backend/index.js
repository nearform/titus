export default class Authentication {
  constructor({ config, t } = {}) {
    this.header = t('header.titus')
    this.powerMessage = t('powerMessages.titus')
    this.config = config
  }

  async login({ username, password }) {
    const response = await fetch(`${this.config.serverUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!response.ok) {
      throw Error((await response.json()).message)
    }
    const authResult = await response.json()
    if (authResult && authResult.access_token) {
      localStorage.setItem('access_token', authResult.access_token)
      localStorage.setItem(
        'expires_at',
        authResult.expires_in * 1000 + new Date().getTime()
      )
    }
    return { username }
  }

  async logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at')
    return true
  }

  isAuthenticated() {
    try {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
      return new Date().getTime() < expiresAt
    } catch (err) {
      // unparseable state: log out
      this.logout()
      return false
    }
  }

  getUserData() {
    return { username: 'Dontknow' }
  }
}
