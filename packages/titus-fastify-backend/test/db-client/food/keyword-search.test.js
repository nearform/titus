const SQL = require('@nearform/sql')

const keywordSearch = require('../../../lib/db-client/food/keyword-search')

jest.mock('@nearform/sql')

let sqlStub
beforeEach(() => {
  sqlStub = {
    append: jest.fn()
  }

  SQL.mockReset()
  SQL.mockReturnValueOnce(sqlStub)
})

test('returns row with camelised column names', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rows: [{ some_column: 'some_value' }, { some_column: 'from_search_result' }] })
  }

  const data = await keywordSearch(pgStub, { needle: 'my-keyword', keywordType: 'levenshtein' })

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)

  expect(data).toEqual([
    { someColumn: 'some_value' },
    { someColumn: 'from_search_result' }
  ])
})

test('rejects with error when db operation fails', async () => {
  const pgStub = {
    query: jest.fn().mockRejectedValue(new Error('something bad happend'))
  }

  await expect(
    keywordSearch(pgStub, { needle: 'my-keyword', type: 'contains' })
  ).rejects.toThrowError('something bad happend')

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith(sqlStub)
})
