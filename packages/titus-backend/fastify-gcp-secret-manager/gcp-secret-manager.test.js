'use strict'

describe('fastify-gcp-secret-manager', () => {
  let server

  beforeAll(async () => {})

  beforeEach(async () => {
    jest.resetModules()
    server = require('fastify')()
  })

  afterEach(async () => server.close())

  afterAll(async () => {
    server.close()
    jest.resetModules()
  })

  it('should read secrets from options.developmentSecrets in dev mode', async () => {
    server.register(require('.'), {
      mode: 'development',
      test: 'I am a test secret',
      developmentSecrets: {
        test: 'I am a test secret for development'
      }
    })

    await server.listen(5003)

    expect(server.secrets).toEqual({
      test: 'I am a test secret for development'
    })
  })

  it('should read secrets from options in production mode', async () => {
    process.env = {
      NODE_ENV: 'production'
    }

    jest.mock('@google-cloud/secret-manager', () => ({
      SecretManagerServiceClient: jest.fn().mockImplementation(() => ({
        accessSecretVersion: jest
          .fn()
          .mockReturnValue([{ payload: { data: 'Hello World!' } }])
      }))
    }))

    server.register(require('.'), {
      test: 'projects/494141678371/secrets/test/versions/latest'
    })

    await server.listen(5003)

    expect(server.secrets).toEqual({
      test: 'Hello World!'
    })
  })

  it('should throw error when secret is not found in production mode', async () => {
    process.env = {
      NODE_ENV: 'production'
    }

    jest.mock('@google-cloud/secret-manager', () => ({
      SecretManagerServiceClient: jest.fn().mockImplementation(() => ({
        accessSecretVersion: jest.fn().mockReturnValue(new Error('not found'))
      }))
    }))

    server.register(require('.'), {
      test: 'secret'
    })

    await server.listen(5003, err => {
      expect(err.message).toEqual('Secret not found: secret')
    })
  })

  it('should not register gcp-secret-manager plugin twice', async () => {
    process.env = {
      NODE_ENV: 'development'
    }

    server.register(require('.'))
    server.register(require('.'))

    await server.listen(5003, err => {
      expect(err.message).toEqual(
        'fastify-gcp-secret-manager has already been registered'
      )
    })
  })
})
