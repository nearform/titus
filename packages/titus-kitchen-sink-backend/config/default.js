'use strict'
const { name, version } = require('../package.json')

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
    port: API_PORT || 5000,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.error('ValidationError:', err)
          throw err
        }
      }
    }
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
    database: POSTGRES_DB || 'postgres',
    // NOTE: Required for udaru, which uses 'user' rather than 'username'
    user: POSTGRES_USER || 'postgres',
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'postgres',
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  swagger: {
    host: '127.0.0.1:5000',
    info: {
      title: `${name} API Documentation`,
      version
    }
  },
  authorization: {
    url: 'http://localhost:5000/authorization/'
  }
}
