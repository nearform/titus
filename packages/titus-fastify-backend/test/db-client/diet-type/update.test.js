const SQL = require('@nearform/sql')

const dbErrors = require('../../../lib/db-client/errors')
const update = require('../../../lib/db-client/diet-type/update')

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
  const dietType = { id: 'some-id', name: 'New Name', visible: false }
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rows: [{ ...dietType }], rowCount: 1 })
  }

  const data = await update(pgStub, dietType)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual({
    id: 'some-id',
    typeName: 'DietType',
    operation: 'update',
    count: 1,
    updated: {
      id: 'some-id',
      name: 'New Name',
      visible: false
    }
  })
})

test('rejects with NotFoundError when update fails without error', async () => {
  const dietType = { id: 'some-id', name: 'New Name', visible: false }
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rowCount: 0 })
  }

  await expect(update(pgStub, dietType)).rejects.toThrow(
    expect.any(dbErrors.NotFoundError)
  )

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})

test('rejects with error when db op fails', async () => {
  const dietType = { id: 'some-id', name: 'New Name', visible: false }
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('some error'))
  }

  await expect(update(pgStub, dietType)).rejects.toThrowError('some error')

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
