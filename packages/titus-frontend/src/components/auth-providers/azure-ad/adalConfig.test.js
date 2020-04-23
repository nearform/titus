describe('Adal config', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should trigger correctly with process.env', async () => {
    process.env = {
      REACT_APP_AD_TENANT: 'tenant',
      REACT_APP_AD_APP_ID: 'id'
    }
    const authContext = require('./adalConfig')

    expect(authContext.adalConfig.tenant).toBe('tenant')
    expect(authContext.adalConfig.clientId).toBe('id')
    expect(authContext.adalConfig.endpoints.api).toBe('id')

    try {
      await authContext.adalApiFetch()
    } catch (err) {
      expect(err).toEqual({
        message: 'User login is required',
        msg: 'login required'
      })
    }
  })

  it('should trigger correctly without process.env', async () => {
    process.env = {
      REACT_APP_AD_TENANT: undefined,
      REACT_APP_AD_APP_ID: undefined
    }

    const authContext = require('./adalConfig')

    expect(authContext.adalConfig.clientId).toBe(undefined)
    expect(authContext.adalConfig.clientId).toBe(undefined)
    expect(authContext.adalConfig.endpoints.api).toBe(undefined)
    expect(authContext.authContext).toBe(null)
  })
})
