const config = require('./config')

describe('config', () => {
  it('check configuration', () => {
    expect(config).toEqual({
      isProduction: false,
      fastify: { host: '0.0.0.0', port: 3002 },
      pgPlugin: {
        host: 'localhost',
        port: 5432,
        database: 'titus',
        user: 'titus',
        password: 'titus',
        poolSize: 10,
        idleTimeoutMillis: 30000
      }
    })
  })
})
