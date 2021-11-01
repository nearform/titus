import serverPlugin from './server'
import config from './config'

describe('server', () => {
  it('starts a server and register plugins', async () => {
    const server = { register: jest.fn() }
    server.register.mockReturnValue(server)

    serverPlugin(server as any, config)
    expect(server.register).toHaveBeenCalledTimes(6)
  })
})
