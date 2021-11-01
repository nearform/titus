import fp from 'fastify-plugin'
import fastify from 'fastify'

import config from '../../config'
import { version } from '../../../package.json'

import runCheckPlugin from '.'

describe('health route', () => {
  let server

  beforeAll(async () => {
    server = fastify()
    server.register(
      fp(
        async (server) => {
          server.decorate('pg', { query: jest.fn() })
        },
        { name: 'pg' }
      )
    )
    server.register(runCheckPlugin, config)
    await server.ready()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should return server health with DB check', async () => {
    server.pg.query.mockResolvedValue({ rowCount: 1 })
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

    expect(server.pg.query).toHaveBeenCalledWith('SELECT $1::text as message', [
      'Hello world!'
    ])
  })

  it('should report failure on DB error', async () => {
    server.pg.query.mockRejectedValue(new Error('boom!'))
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
    server.pg.query.mockRejectedValue({})
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
