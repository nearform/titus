'use strict'

const { version } = require('../../../package')

describe('health route', () => {
  let server
  const client = {
    query: jest.fn().mockResolvedValue([])
  }

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('fastify-postgres'))
    server.register(require('.'))
    await server.ready()
    server.pg.connect = jest.fn()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should return server health with DB check', async () => {
    client.query.mockResolvedValue({ rowCount: 1 })
    server.pg.connect.mockResolvedValue(client)
    const response = await server.inject({
      method: 'GET',
      url: '/healthcheck'
    })

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        db: 'ok',
        serverTimestamp: expect.any(String),
        status: 'ok',
        version
      })
    )

    expect(client.query).toHaveBeenCalledWith('SELECT $1::text as message', [
      'Hello world!'
    ])
  })

  it('should report failure on DB error', async () => {
    client.query.mockRejectedValue(new Error('boom!'))
    server.pg.connect.mockResolvedValue(client)
    const response = await server.inject({
      method: 'GET',
      url: '/healthcheck'
    })

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        db: 'fail',
        serverTimestamp: expect.any(String),
        status: 'ok',
        version
      })
    )
  })

  it('should report failure on empty DB response', async () => {
    client.query.mockRejectedValue({})
    server.pg.connect.mockResolvedValue(client)
    const response = await server.inject({
      method: 'GET',
      url: '/healthcheck'
    })

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        db: 'fail',
        serverTimestamp: expect.any(String),
        status: 'ok',
        version
      })
    )
  })
})
