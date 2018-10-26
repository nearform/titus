const SQL = require('@nearform/sql')

const create = require('../../../lib/db-client/food-group/create')

jest.mock('@nearform/sql')

let sqlStub
beforeEach(() => {
  sqlStub = {
    append: jest.fn()
  }

  SQL.mockReset()
  SQL.mockReturnValueOnce(sqlStub)
})

test('resolves with create object', async () => {
  const foodGroup = { name: 'My Food Group', foodGroupId: 'some-id' }
  const pgStub = {
    query: jest
      .fn()
      .mockResolvedValue({
        rows: [{ id: 'new-food-group-id', ...foodGroup }],
        rowCount: 1
      })
  }

  const data = await create(pgStub, { foodGroup })

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual({
    id: 'new-food-group-id',
    typeName: 'FoodGroup',
    operation: 'create',
    count: 1,
    created: {
      id: 'new-food-group-id',
      name: 'My Food Group',
      foodGroupId: 'some-id'
    }
  })
})

test('rejects with error when db op fails', async () => {
  const foodGroup = { name: 'My Food Group', foodGroupId: 'some-id' }
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('some error'))
  }

  await expect(create(pgStub, { foodGroup })).rejects.toThrowError('some error')

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
