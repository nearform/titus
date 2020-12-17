'use strict'

describe('user route', () => {
  let server

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('.'))
    server.addHook('onRequest', async (req, res) => {
      req.user = { id: 'id-01' }
    })
    await server.ready()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should return user', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(JSON.parse(response.payload)).toEqual({ id: 'id-01' })
  })
})
