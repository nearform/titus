'use strict'

describe('log route', () => {
  let server

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('.'))
    await server.ready()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should return user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/log',
      body: {
        msg: 'test message'
      }
    })
    expect(JSON.parse(response.body).message).toBe('logged successfully')
    expect(response.statusCode).toEqual(200)
  })
})
