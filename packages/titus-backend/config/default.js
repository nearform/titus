module.exports = {
  hapi: {
    host: null,
    port: 5000
  },
  logger: {
    pino: {
      prettyPrint: process.env.NODE_ENV !== 'production'
    }
  },
  db: {
    host: null,
    port: 5432,
    database: 'titus',
    username: 'titus',
    // NOTE: Required for udaru, which uses 'user' rather than 'username'
    user: 'titus',
    password: 'titus',
    poolSize: 10,
    idleTimeoutMillis: 30000
  }
}
