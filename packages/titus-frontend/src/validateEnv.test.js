'use strict'

describe('validateEnv file', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should succeed if env variables are present', async () => {
    process.env = {
      NODE_ENV: 'development',
      REACT_APP_API_PATH: 'http://localhost'
    }

    try {
      const validateResult = require('./validateEnv').validate()
      expect(validateResult).toEqual(undefined)
    } catch (err) {
      console.error(err)
    }
  })

  it('should fail if REACT_APP_API_PATH env variables is missing', async () => {
    process.env = {
      NODE_ENV: 'development',
      REACT_APP_API_PATH: undefined
    }

    try {
      require('./validateEnv').validate()
    } catch (err) {
      expect(err.message).toEqual(
        "should have required property 'REACT_APP_API_PATH'"
      )
    }
  })
})
