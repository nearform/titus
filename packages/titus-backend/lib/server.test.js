'use strict'

describe('server', () => {
  it('starts a server and register plugins', async () => {
    const server = { register: jest.fn() }
    server.register.mockReturnValue(server)
    require('./server')(server, require('./config'))
    expect(server.register).toHaveBeenCalledTimes(4)
  })
})
