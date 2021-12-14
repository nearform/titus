const truncate = require('.')

describe('truncate', () => {
  it('runs truncate command', async () => {
    const pg = {
      query: jest.fn().mockResolvedValueOnce(null)
    }
    const result = await truncate(pg, {
      schema: 'foo',
      logger: {
        info: jest.fn()
      }
    })
    expect(result).toBe(true)
    expect(pg.query).toHaveBeenCalledWith(`
    TRUNCATE TABLE
      foo.some_table
    RESTART IDENTITY;
  `)
  })
})
