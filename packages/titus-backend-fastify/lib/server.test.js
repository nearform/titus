const startServer = require('./server')
const config = {
  ...require('./config'),
  fastifyInit: { logger: false }
}

describe('server', () => {
  let server, address

  afterEach(async () => server.close())

  it('starts a server using env config', async () => {
    server = await startServer(config)
    address = server.server.address()
    expect(address.address).toEqual(config.fastify.host)
  })

  it('starts a server using env custom port', async () => {
    const customConfig = {
      ...config,
      fastify: {
        port: 5555
      }
    }
    server = await startServer(customConfig)
    address = server.server.address()
    expect(address.port).toEqual(customConfig.fastify.port)
  })

  it('throws an error when listening', async () => {
    server.listen = jest.fn().mockRejectedValue()
    server.log.error = jest.fn()
    server = await startServer({ ...config, fastify: 2 })
    expect(server.log.error).toHaveBeenCalled()
  })

  it('handle 404', async () => {
    server = await startServer(config)
    address = server.server.address()
    address = `http://${address.address}:${address.port}`

    const response = await server.inject({
      method: 'GET',
      url: `${address}/unknown`
    })

    expect(response.statusCode).toBe(404)
  })
})
