const dbClientFactory = require('../../lib/db-client')
const dbClientPlugin = require('../../lib/plugins/db-client')

jest.mock('../../lib/db-client')

test('dbClient plugin should call decorateRequest with the dbClient', async () => {
  const serverStub = {
    decorateRequest: jest.fn()
  }

  dbClientFactory.mockReturnValueOnce('db-client-object')

  dbClientPlugin(serverStub, {}, () => {
    expect(serverStub.decorateRequest).toHaveBeenCalledTimes(1)

    expect(serverStub.decorateRequest).toBeCalledWith('dbClient', expect.objectContaining({
      getter: expect.any(Function)
    }))

    const dbClient = serverStub.decorateRequest.mock.calls[0][1].getter()

    expect(dbClient).toBe('db-client-object')
  })
})
