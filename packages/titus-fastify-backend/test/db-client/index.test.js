const modelHelperFactory = require('../../lib/db-client/model-helper')
const dbClientFactory = require('../../lib/db-client')

jest.mock('../../lib/db-client/model-helper')

test('dbClient plugin should call decorateRequest with the dbClient', async () => {
  const modelHelperStub = jest.fn()
  modelHelperStub.mockReturnValue('WRAPPED FUNC')

  modelHelperFactory.mockReturnValueOnce(modelHelperStub)

  const dbClient = dbClientFactory({ pg: 'pg-stub' })

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
