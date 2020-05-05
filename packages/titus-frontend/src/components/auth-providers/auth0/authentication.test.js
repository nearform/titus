import { WebAuth } from 'auth0-js'
import Authentication from './index'

jest.mock('auth0-js')

const mockWeb = {
  authorize: jest.fn(),
  parseHash: jest.fn(),
  logout: jest.fn()
}

WebAuth.mockImplementation(() => mockWeb)

describe('Authorization constructor auth0', () => {
  const storage = {}
  const authentication = new Authentication({
    config: {
      auth0: {
        domain: 'domain',
        clientId: 'clientId',
        audience: 'audience'
      }
    }
  })

  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: (key, value) => (storage[key] = value),
      getItem: key => {
        return JSON.stringify(storage[key])
      },
      removeItem: key => delete storage[key]
    }
  })

  it('should trigger getUserData correctly', () => {
    expect(authentication.getUserData()).toEqual({ username: 'Dontknow' })
  })

  it('should trigger logout correctly', () => {
    authentication.logout()

    expect(storage).toEqual({})
    expect(mockWeb.logout.mock.calls.length).toBe(1)
  })

  it('should trigger login correctly', async () => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    storage['expires_at'] = tomorrow.getTime()

    expect(await authentication.login()).toEqual({ username: 'Dontknow ' })
  })

  it('should trigger login correctly', async () => {
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    storage['expires_at'] = yesterday.getTime()

    authentication.login()
    expect(mockWeb.authorize.mock.calls.length).toBe(1)
  })

  it('should trigger isAuthenticated correctly', async () => {
    delete storage['expires_at']

    expect(await authentication.isAuthenticated()).toEqual(false)
  })

  it('should trigger parseHash correctly', async () => {
    mockWeb.parseHash.mockImplementation(f =>
      f(false, { accessToken: 'token', idToken: 'id', expiresIn: 0 })
    )

    authentication.parseHash()

    expect(storage.access_token).toEqual('token')
    expect(storage.id_token).toEqual('id')
  })

  it('should trigger parseHash correctly', async () => {
    delete storage['access_token']
    delete storage['id_token']
    delete storage['expires_at']

    mockWeb.parseHash.mockImplementation(f => f(false, null))

    authentication.parseHash()
    expect(storage).toEqual({})
  })
})
