const SQL = require('@nearform/sql')

const create = require('../../../lib/db-client/food/create')

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
  const food = { name: 'My Food', foodGroupId: 'some-id' }
  const pgStub = {
    query: jest
      .fn()
      .mockResolvedValue({
        rows: [{ id: 'new-food-id', ...food }],
        rowCount: 1
      })
  }

  const data = await create(pgStub, { food })

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual({
    id: 'new-food-id',
    typeName: 'Food',
    operation: 'create',
    count: 1,
    updated: {
      id: 'new-food-id',
      name: 'My Food',
      foodGroupId: 'some-id'
    }
  })
})

test('rejects with error when db op fails', async () => {
  const food = { name: 'My Food', foodGroupId: 'some-id' }
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('some error'))
  }

  await expect(create(pgStub, { food })).rejects.toThrowError('some error')

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
