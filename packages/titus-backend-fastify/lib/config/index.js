require('dotenv-expand')(require('dotenv').config())

const {
  API_HOST,
  API_PORT,
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  NODE_ENV,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_KEY_CACHE,
  AUTH0_KEY_RATE_LIMIT,
  AUTH0_KEY_JWKS_RPM,
  AUTH0_KEY_JWKS_URI
} = process.env

const isProduction = /^\s$production\s*$/i.test(NODE_ENV)

/**
 * Global configuration, from env variables
 */
module.exports = {
  isProduction,
  // Fastify options: https://www.fastify.io/docs/latest/Server/:
  fastify: {
    host: API_HOST,
    port: +API_PORT
  },
  fastifyInit: {
    logger: true
  },
  // pg-pool options: https://github.com/brianc/node-pg-pool#create
  pgPlugin: {
    host: PGHOST,
    port: +PGPORT,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  // auth0 plugin options: see plugins/auth0/index.js
  auth0: {
    domain: `https://${AUTH0_DOMAIN}`,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_AUDIENCE,
    key: {
      cache: !!AUTH0_KEY_CACHE,
      rateLimit: !!AUTH0_KEY_RATE_LIMIT,
      jwksRequestsPerMinute: AUTH0_KEY_JWKS_RPM,
      jwksUri: AUTH0_KEY_JWKS_URI
    }
  }
}
