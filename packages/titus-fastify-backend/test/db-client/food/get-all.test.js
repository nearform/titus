const SQL = require('@nearform/sql')

const getAll = require('../../../lib/db-client/food/get-all')

jest.mock('@nearform/sql')

SQL.mockReturnValue('input-query')

test('returns rows array with camelised column names', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rows: [{ some_column: 'some_value' }, { some_other_column: 'some_other_value' }] })
  }

  const data = await getAll(pgStub, { offset: 10, limit: 5 })

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith('input-query')

  expect(data).toEqual([
    { someColumn: 'some_value' },
    { someOtherColumn: 'some_other_value' }
  ])
})
