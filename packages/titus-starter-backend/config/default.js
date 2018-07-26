module.exports = {
  hapi: {
    host: null,
    port: 5000
  },
  logger: {
    pino: {
      prettyPrint: process.env.NODE_ENV !== 'production',
      level: 'debug'
    }
  },
  db: {
    host: null,
    port: 5432,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    poolSize: 10,
    idleTimeoutMillis: 30000
  }
}
