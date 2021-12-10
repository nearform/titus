const seed = require('.')

describe('seed', () => {
  it('runs seed command', async () => {
    const pg = {}
    const result = await seed(pg, {
      logger: {
        info: jest.fn()
      }
    })
    expect(result).toBe(true)
  })
})
