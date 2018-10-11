const SQL = require('@nearform/sql')

const getAll = require('../../../lib/db-client/food-group/get-all')

jest.mock('@nearform/sql')

let sqlStub
beforeEach(() => {
  sqlStub = {
    append: jest.fn()
  }

  SQL.mockReset()
  SQL.mockReturnValueOnce(sqlStub)
})

test('returns rows array with camelised column names', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rows: [{ some_column: 'some_value' }, { some_other_column: 'some_other_value' }] })
  }

  const data = await getAll(pgStub)

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual([
    { someColumn: 'some_value' },
    { someOtherColumn: 'some_other_value' }
  ])
})

test('rejects with error when db op fails', async () => {
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('something bad happend'))
  }

  await expect(
    getAll(pgStub)
  ).rejects.toThrowError('something bad happend')

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
