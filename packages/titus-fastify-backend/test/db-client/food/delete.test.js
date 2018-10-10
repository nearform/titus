const SQL = require('@nearform/sql')

const deleteFood = require('../../../lib/db-client/food/delete')

jest.mock('@nearform/sql')

let sqlStub
beforeEach(() => {
  sqlStub = {
    append: jest.fn()
  }

  SQL.mockReset()
  SQL.mockReturnValueOnce(sqlStub)
})

test('resolves with delete object', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rowCount: 2 })
  }

  const data = await deleteFood(pgStub, { ids: ['food-id-1', 'food-id-2'] })

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual({
    ids: ['food-id-1', 'food-id-2'],
    typeName: 'Food',
    operation: 'delete',
    count: 2
  })
})

test('rejects with error when db op fails', async () => {
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('delete failed'))
  }

  await expect(
    deleteFood(pgStub, { ids: ['food-id-1', 'food-id-2'] })
  ).rejects.toThrowError('delete failed')

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
