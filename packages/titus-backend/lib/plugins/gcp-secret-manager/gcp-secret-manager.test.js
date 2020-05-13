'use strict'

describe('gcp-secret-manager plugin', () => {
  let server

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('.'), {
      secretManager: { test: '123' },
      developmentSecrets: { test: '123' }
    })

    await server.listen(5003)
  })

  afterAll(async () => server.close())

  it('should decorate server with development secrets', async () => {
    expect(server.secrets).toEqual({ test: '123' })
  })
})
