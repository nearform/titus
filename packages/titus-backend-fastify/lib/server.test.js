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

  it('throws an error when listening', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    server = await startServer({ ...config, fastify: 2 })
    expect(mockExit).toHaveBeenCalledWith(1)
    mockExit.mockRestore()
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
