const modelHelperFactory = require('../../lib/db-client/model-helper')
const transactionalModelHelperFactory = require('../../lib/db-client/transactional-model-helper')

const dbClientFactory = require('../../lib/db-client')

jest.mock('../../lib/db-client/model-helper')
jest.mock('../../lib/db-client/transactional-model-helper')

test('dbClient plugin should call decorateRequest with the dbClient', async () => {
  const modelHelperStub = jest.fn()
  modelHelperStub.mockReturnValue('WRAPPED FUNC')
  modelHelperFactory.mockReturnValueOnce(modelHelperStub)

  const transactionalModelHelperStub = jest.fn()
  transactionalModelHelperStub.mockReturnValue('TRANSACTIONALLY WRAPPED FUNC')
  transactionalModelHelperFactory.mockReturnValueOnce(
    transactionalModelHelperStub
  )

  const dbClient = dbClientFactory({ pg: 'pg-stub' })

  expect(dbClient).toMatchObject({
    food: {
      getAll: 'WRAPPED FUNC',
      getById: 'WRAPPED FUNC',
      search: 'WRAPPED FUNC',
      keyword: 'WRAPPED FUNC',
      create: 'TRANSACTIONALLY WRAPPED FUNC',
      update: 'TRANSACTIONALLY WRAPPED FUNC',
      delete: 'TRANSACTIONALLY WRAPPED FUNC',
      history: 'WRAPPED FUNC'
    },
    dietType: {
      getAll: 'WRAPPED FUNC',
      delete: 'TRANSACTIONALLY WRAPPED FUNC',
      update: 'TRANSACTIONALLY WRAPPED FUNC'
    },
    foodGroup: {
      getById: 'WRAPPED FUNC',
      getAll: 'WRAPPED FUNC',
      create: 'TRANSACTIONALLY WRAPPED FUNC'
    }
  })
})
