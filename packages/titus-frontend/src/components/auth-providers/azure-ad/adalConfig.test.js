const authContext = require('./adalConfig')

describe('Adal config', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should trigger correctly with process.env', async () => {
    const config = { adal: { tenant: 'tenant', clientId: 'id' } }
    const adalConfig = authContext.getAdalConfig(config)
    const Auth = authContext.getAuthContext(config)

    expect(adalConfig.tenant).toBe('tenant')
    expect(adalConfig.clientId).toBe('id')
    expect(adalConfig.endpoints.api).toBe('id')

    try {
      await authContext.adalApiFetch(Auth, adalConfig)
    } catch (err) {
      expect(err).toEqual({
        message: 'User login is required',
        msg: 'login required'
      })
    }
  })

  it('should trigger correctly without process.env', async () => {
    const config = { adal: { tenant: undefined, clientId: undefined } }
    const adalConfig = authContext.getAdalConfig(config)
    const Auth = authContext.getAuthContext(config)

    expect(adalConfig.clientId).toBe(undefined)
    expect(adalConfig.clientId).toBe(undefined)
    expect(adalConfig.endpoints.api).toBe(undefined)
    expect(Auth).toBe(null)
  })
})
