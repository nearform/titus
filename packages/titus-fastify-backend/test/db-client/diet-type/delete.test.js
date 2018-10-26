const SQL = require('@nearform/sql')

const deleteDietType = require('../../../lib/db-client/diet-type/delete')

jest.mock('@nearform/sql')

let sqlStub
beforeEach(() => {
  sqlStub = {
    append: jest.fn()
  }

  SQL.mockReset()
  SQL.mockReturnValueOnce(sqlStub)
})

test('returns delete object when delete succeeds', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rowCount: 1 })
  }

  const data = await deleteDietType(pgStub, { id: 'some-id' })

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual({
    id: 'some-id',
    operation: 'delete'
  })
})

test('rejects with error when db op fails', async () => {
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('something bad happend'))
  }

  await expect(deleteDietType(pgStub, { id: 'some-id' })).rejects.toThrowError(
    'something bad happend'
  )

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
