import Auth from '@aws-amplify/auth'

import Authentication from '.'

jest.mock('@aws-amplify/auth', () => ({
  signIn: jest.fn(),
  completeNewPassword: jest.fn(),
  currentAuthenticatedUser: jest.fn(),
  signOut: jest.fn()
}))

describe('Authorization constructor', () => {
  const authentication = new Authentication({
    config: {
      aws: {
        region: '',
        userPoolId: '',
        userPoolWebClientId: '',
        identityPoolId: ''
      }
    },
    t: () => {}
  })

  it('should trigger logout correctly', async () => {
    expect(await authentication.logout()).toEqual(true)
    expect(Auth.signOut.mock.calls.length).toBe(1)
  })

  it('should trigger isAuthenticated correctly', async () => {
    expect(await authentication.isAuthenticated()).toEqual(false)
  })

  it('should trigger login with throw correctly', async () => {
    Auth.signIn.mockImplementation(() => {
      throw new Error('Throwing error')
    })
    try {
      await authentication.login({})
    } catch (error) {
      expect(error).toEqual(new Error('Throwing error'))
    }
  })

  it('should trigger login correctly', async () => {
    Auth.signIn.mockImplementation(() => ({}))
    Auth.currentAuthenticatedUser.mockImplementation(() => ({
      username: 'username'
    }))

    expect(
      await authentication.login({ username: 'username', password: 'pass' })
    ).toEqual({ username: 'username' })
  })

  it('should trigger getUserData correctly', () => {
    expect(authentication.getUserData()).toEqual({ username: 'username' })
  })

  it('should trigger login with newPassword correctly', async () => {
    Auth.signIn.mockImplementation(() => ({}))
    Auth.completeNewPassword.mockImplementation(() => ({
      username: 'username'
    }))

    expect(
      await authentication.login({
        username: 'username',
        newPassword: 'newpass',
        password: 'pass'
      })
    ).toEqual({ username: 'username' })
  })

  it('should trigger isAuthenticated with localStorage correctly', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        mock1: 'mock1',
        mock2: 'mock2'
      }
    })

    expect(await authentication.isAuthenticated()).toEqual(false)
  })

  it('should trigger login with challengeName correctly', async () => {
    Auth.signIn.mockImplementation(() => ({
      challengeName: 'NEW_PASSWORD_REQUIRED'
    }))

    try {
      await authentication.login({
        username: 'username',
        password: 'pass'
      })
    } catch (err) {
      expect(err).toEqual(new Error())
    }
  })
})
