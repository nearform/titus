'use strict'

describe('fastify-gcp-secret-manager', () => {
  let server

  beforeAll(async () => {})

  beforeEach(async () => {
    server = require('fastify')()
  })

  afterEach(async () => server.close())

  afterAll(async () => server.close())

  it('should read secrets from options.developmentSecrets in dev mode', async () => {
    process.env = {
      NODE_ENV: 'test'
    }

    server.register(require('.'), {
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
})
