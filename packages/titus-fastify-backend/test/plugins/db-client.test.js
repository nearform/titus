const modelHelperFn = require('../../lib/plugins/model-helper')
const dbClientPlugin = require('../../lib/plugins/db-client')

jest.mock('../../lib/plugins/model-helper')

test('dbClient plugin should call decorateRequest with the dbClient', async () => {
  const serverStub = {
    decorateRequest: jest.fn()
  }

  const modelHelperStub = jest.fn()
  modelHelperStub.mockReturnValue('WRAPPED FUNC')

  modelHelperFn.mockReturnValueOnce(modelHelperStub)

  dbClientPlugin(serverStub, {}, () => {
    expect(serverStub.decorateRequest).toHaveBeenCalledTimes(1)

    expect(serverStub.decorateRequest).toBeCalledWith('dbClient', expect.objectContaining({
      getter: expect.any(Function)
    }))

    const dbClient = serverStub.decorateRequest.mock.calls[0][1].getter()

    expect(dbClient).toMatchObject({
      food: {
        getAll: 'WRAPPED FUNC',
        getById: 'WRAPPED FUNC',
        search: 'WRAPPED FUNC',
        keyword: 'WRAPPED FUNC',
        create: 'WRAPPED FUNC',
        update: 'WRAPPED FUNC',
        deleteFoods: 'WRAPPED FUNC'
      },
      dietType: {
        getAll: 'WRAPPED FUNC',
        deleteDietType: 'WRAPPED FUNC',
        toggleDietTypeVisibility: 'WRAPPED FUNC'
      },
      foodGroup: {
        getById: 'WRAPPED FUNC',
        getByIds: 'WRAPPED FUNC',
        getAll: 'WRAPPED FUNC',
        create: 'WRAPPED FUNC'
      },
      foodHistory: {
        findByFoodId: 'WRAPPED FUNC'
      }
    })
  })
})
