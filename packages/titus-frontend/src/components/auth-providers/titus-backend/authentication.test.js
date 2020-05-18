import Authentication from './index'

describe('titus-backend auth provider', () => {
  const authentication = new Authentication({ t: () => '' })
  const access_token = 'access_token'
  const id_token = 'id_token'

  it('should trigger login correctly', async () => {
    const oldFetch = fetch
    try {
      fetch = jest.fn().mockImplementation((url, options) => {
        return {
          ok: true,
          json: () => {
            return {
              access_token,
              id_token,
              expires_in: 1000
            }
          }
        }
      })
      const res = await authentication.login({
        username: 'test',
        password: 'test'
      })
      expect(res).toStrictEqual({ username: 'test' })
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test', password: 'test' })
      })
      expect(localStorage.getItem('access_token')).toBe(access_token)
      expect(localStorage.getItem('id_token')).toBe(id_token)
      expect(parseInt(localStorage.getItem('expires_at'))).toBeGreaterThan(
        900 * 1000 + new Date().getTime()
      )
    } finally {
      fetch = oldFetch
    }
  })

  it('should trigger logout correctly', async () => {
    const res = await authentication.logout()
    expect(res).toBe(true)
  })

  it('should trigger isAuthenticated correctly when signed in', () => {
    localStorage.setItem('expires_at', 1000 + new Date().getTime())
    expect(authentication.isAuthenticated()).toBe(true)
    localStorage.removeItem('expires_at')
  })

  it('should trigger getUserData correctly', () => {
    expect(authentication.getUserData()).toEqual({ username: 'Dontknow' })
  })

  it('should trigger isAuthenticated correctly when logged out', () => {
    expect(authentication.isAuthenticated()).toBe(false)
  })
})
