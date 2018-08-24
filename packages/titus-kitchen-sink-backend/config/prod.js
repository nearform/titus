'use strict'

const {
  API_HOST,
  API_PORT,
  PGHOST,
  PGPORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT
} = process.env

module.exports = {
  hapi: {
    host: API_HOST || null,
    port: API_PORT || 5000
  },
  logger: {
    pino: {
      prettyPrint: NODE_ENV !== 'production',
      level: 'debug'
    }
  },
  redis: {
    host: REDIS_HOST || 'redis',
    port: REDIS_PORT || 6379
  },
  db: {
    host: PGHOST || null,
    port: PGPORT || 5432,
    database: POSTGRES_DB || 'titus',
    // NOTE: Required for udaru, which uses 'user' rather than 'username'
    user: POSTGRES_USER || 'titus',
    username: POSTGRES_USER || 'titus',
    password: POSTGRES_PASSWORD || 'titus',
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  authorization: {
    url: 'https://titus.nearform.com/authorization/'
  }
}
