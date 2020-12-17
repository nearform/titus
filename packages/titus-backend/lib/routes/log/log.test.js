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

  it('should test log with level: info', async () => {
    jest.spyOn(server.log, 'info')
    const response = await server.inject({
      method: 'POST',
      url: '/',
      body: {
        msg: 'test message'
      }
    })
    expect(server.log.info).toHaveBeenCalledWith({ front: 'test message' })
    expect(JSON.parse(response.body).message).toBe('logged successfully')
    expect(response.statusCode).toEqual(200)
  })

  it('should test log with level: warn', async () => {
    jest.spyOn(server.log, 'warn')
    const response = await server.inject({
      method: 'POST',
      url: '/',
      body: {
        msg: 'test warn message',
        level: 'warn'
      }
    })
    expect(server.log.warn).toHaveBeenCalledWith({ front: 'test warn message' })
    expect(JSON.parse(response.body).message).toBe('logged successfully')
    expect(response.statusCode).toEqual(200)
  })

  it('should test log with level: error', async () => {
    jest.spyOn(server.log, 'error')
    const response = await server.inject({
      method: 'POST',
      url: '/',
      body: {
        msg: 'test error message',
        level: 'error'
      }
    })
    expect(server.log.error).toHaveBeenCalledWith({
      front: 'test error message'
    })
    expect(JSON.parse(response.body).message).toBe('logged successfully')
    expect(response.statusCode).toEqual(200)
  })
})
