const SQL = require('@nearform/sql')

const dbErrors = require('../../../lib/db-client/errors')
const update = require('../../../lib/db-client/food/update')

jest.mock('@nearform/sql')

let sqlStub
beforeEach(() => {
  sqlStub = {
    append: jest.fn()
  }

  SQL.mockReset()
  SQL.mockReturnValueOnce(sqlStub)
})

test('resolves with updated object', async () => {
  const food = { id: 'food-id', name: 'My Food', foodGroupId: 'group-id' }
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rows: [{ ...food }], rowCount: 1 })
  }

  const data = await update(pgStub, { food })

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual({
    id: 'food-id',
    typeName: 'Food',
    operation: 'update',
    count: 1,
    updated: {
      id: 'food-id',
      name: 'My Food',
      foodGroupId: 'group-id'
    }
  })
})

test('rejects with NotFoundError when update fails without error', async () => {
  const food = { id: 'food-id', name: 'My Food', foodGroupId: 'group-id' }
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rowCount: 0 })
  }

  await expect(update(pgStub, { food })).rejects.toThrow(
    expect.any(dbErrors.NotFoundError)
  )

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})

test('rejects with error when db op fails', async () => {
  const food = { id: 'food-id', name: 'My Food', foodGroupId: 'group-id' }
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('some error'))
  }

  await expect(update(pgStub, { food })).rejects.toThrowError('some error')

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
