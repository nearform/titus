const truncate = require('.')

describe('truncate', () => {
  it('runs truncate command', async () => {
    const pg = {
      query: jest.fn().mockResolvedValueOnce(null)
    }
    const result = await truncate(pg)
    expect(result).toBe(undefined)
    expect(pg.query).toHaveBeenCalledWith(`
    TRUNCATE TABLE
      some_table
    RESTART IDENTITY;
  `)
  })
})
