'use strict'
const envSchema = require('env-schema')
const S = require('fluent-schema')

const config = envSchema({
  dotenv: true,
  schema: S.object()
    .prop('NODE_ENV', S.string().required())
    .prop('API_HOST', S.string().required())
    .prop('API_PORT', S.string().required())
    .prop('PGHOST', S.string().required())
    .prop('PGPORT', S.string().required())
    .prop('PGUSER', S.string().required())
    .prop('PGPASSWORD', S.string().required())
    .prop('PGDATABASE', S.string().required())
    .prop('AUTH0_DOMAIN', S.string())
    .prop('AUTH0_CLIENT_ID', S.string())
    .prop('AUTH0_CLIENT_SECRET', S.string())
    .prop('AUTH0_AUDIENCE', S.string())
    .prop('AUTH0_GRANT_TYPE', S.string())
    .prop('JTW_SECRET', S.string().default('3000'))
})

const isProduction = /^\s$production\s*$/i.test(config.NODE_ENV)

/**
 * Global configuration, from env variables
 */
module.exports = {
  isProduction,
  // Fastify options: https://www.fastify.io/docs/latest/Server/:
  fastify: {
    host: config.API_HOST,
    port: +config.API_PORT
  },
  fastifyInit: {
    logger: true
  },
  // pg-pool options: https://github.com/brianc/node-pg-pool#create
  pgPlugin: {
    host: config.PGHOST,
    port: +config.PGPORT,
    database: config.PGDATABASE,
    user: config.PGUSER,
    password: config.PGPASSWORD,
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  // under pressure options: https://github.com/fastify/under-pressure
  underPressure: {},
  // cors options: https://github.com/fastify/fastify-cors
  cors: { origin: !!config.CORS_ORIGIN },
  // auth0 plugin options: see plugins/auth0/index.js
  auth0: {
    domain: `https://${config.AUTH0_DOMAIN}`,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    audience: config.AUTH0_AUDIENCE,
    grantType: config.AUTH0_GRANT_TYPE
  },
  jwt: {
    secret: config.JTW_SECRET
  }
}
