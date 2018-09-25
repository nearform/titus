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
  REDIS_PORT,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_KEY_CACHE,
  AUTH0_KEY_RATE_LIMIT,
  AUTH0_KEY_JWKS_RPM,
  AUTH0_KEY_JWKS_URI
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
    database: POSTGRES_DB || 'postgres',
    // NOTE: Required for udaru, which uses 'user' rather than 'username'
    user: POSTGRES_USER || 'postgres',
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'postgres',
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  authorization: {
    url: 'http://localhost:5000/authorization/'
  },
  auth0: {
    domain: `https://${AUTH0_DOMAIN}`,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_AUDIENCE,
    key: {
      cache: !!AUTH0_KEY_CACHE,
      rateLimit: !!AUTH0_KEY_RATE_LIMIT,
      jwksRequestsPerMinute: AUTH0_KEY_JWKS_RPM || 5,
      jwksUri:
        AUTH0_KEY_JWKS_URI || `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
    }
  }
}
