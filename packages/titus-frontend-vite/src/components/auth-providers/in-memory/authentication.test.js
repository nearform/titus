import Authentication from '.'

describe('Authorization constructor', () => {
  const storage = {}
  const authentication = new Authentication({ t: () => {} })

  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: (key, value) => (storage[key] = value),
      getItem: key => storage[key],
      removeItem: key => delete storage[key]
    }
  })

  it('should trigger login correctly', async () => {
    expect(storage).toEqual({})
    expect(await authentication.login({ username: 'name' })).toEqual({
      username: 'name'
    })
    expect(storage).toEqual({ 'titus-auth-key': 'name' })
  })

  it('should trigger isAuthenticated correctly', () => {
    storage['titus-auth-key'] = 'key'

    expect(authentication.isAuthenticated()).toBe(true)
  })

  it('should trigger logout correctly', async () => {
    expect(storage).toEqual({ 'titus-auth-key': 'key' })
    expect(await authentication.logout()).toBe(true)
    expect(storage).toEqual({})
  })

  it('should trigger getUserData correctly', () => {
    storage['titus-auth-key'] = 'username'

    expect(authentication.getUserData()).toEqual({ username: 'username' })
  })
})
