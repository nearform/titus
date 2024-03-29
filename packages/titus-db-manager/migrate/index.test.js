const migrate = require('.')

describe('migrate', () => {
  it('runs postgres migration', async () => {
    const pg = {
      migrate: jest.fn().mockResolvedValueOnce(null)
    }
    const result = await migrate(pg, {
      logger: {
        info: jest.fn()
      }
    })
    expect(result).toBe(true)
    expect(pg.migrate).toHaveBeenCalledTimes(1)
  })
})
