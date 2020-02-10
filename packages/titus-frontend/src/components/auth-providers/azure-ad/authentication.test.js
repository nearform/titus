import Authentication, { Login } from './index'
import { authContext } from './adalConfig'

jest.mock('./adalConfig', () => ({
  authContext: {
    logOut: jest.fn(),
    getCachedUser: jest.fn()
  }
}))

describe('Authorization constructor', () => {
  const authentication = new Authentication()

  it('should trigger logout correctly', () => {
    expect(authentication.logout()).toBe(true)
  })

  it('should trigger isAuthenticated correctly', () => {
    authContext.getCachedUser.mockImplementation(() => ({
      username: 'username'
    }))

    expect(authentication.isAuthenticated()).toBe(true)
  })

  it('should trigger getUserData correctly', () => {
    expect(authentication.getUserData()).toEqual({ username: 'username' })
  })

  it('should trigger isAuthenticated correctly', () => {
    authContext.getCachedUser.mockImplementation(() => false)
    expect(authentication.isAuthenticated()).toBe(false)
  })
})

describe('Login', () => {
  it('should trigger Login correctly', () => {
    expect(Login()).toEqual(null)
  })
})
