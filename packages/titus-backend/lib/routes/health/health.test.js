'use strict'

const { version } = require('../../../package')
let pg = require('../../services/pg')

jest.mock('../../services/pg', () => ({
  query: jest.fn()
}))

describe('health route', () => {
  let server, address

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('.'))
    address = await server.listen(5001)
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should return server health with DB check', async () => {
    pg.query.mockResolvedValue({ rowCount: 1 })
    const response = await server.inject({
      method: 'GET',
      url: `${address}/healthcheck`
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

    expect(pg.query).toHaveBeenCalledWith('SELECT $1::text as message', [
      'Hello world!'
    ])
  })

  it('should report failure on DB error', async () => {
    pg.query.mockRejectedValue(new Error('error'))
    const response = await server.inject({
      method: 'GET',
      url: `${address}/healthcheck`
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
    pg.query.mockResolvedValue({ rowCount: 0 })
    const response = await server.inject({
      method: 'GET',
      url: `${address}/healthcheck`
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
