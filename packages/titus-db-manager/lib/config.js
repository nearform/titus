'use strict'

const path = require('path')

const envSchema = require('env-schema')
const S = require('fluent-schema')

const config = envSchema({
  dotenv: { path: path.join(__dirname, '..', '.env') },
  schema: S.object()
    .prop('HTTP_HOST', S.string().default('localhost'))
    .prop('HTTP_PORT', S.string().required())
    .prop('NODE_ENV', S.string().required())
    .prop('PG_HOST', S.string().required())
    .prop('PG_PORT', S.string().required())
    .prop('PG_USER', S.string().required())
    .prop('PG_DATABASE', S.string().required())
    .prop('SECRETS_STRATEGY', S.string())
    .prop('SECRETS_PG_PASS', S.string().required())
})

const isProduction = /^\s$production\s*$/i.test(config.NODE_ENV)

/**
 * Global configuration, from env variables
 */
module.exports = {
  isProduction,
  // Fastify options: https://www.fastify.io/docs/latest/Server/:
  fastify: {
    host: config.HTTP_HOST,
    port: +config.HTTP_PORT
  },
  // pg-pool options: https://github.com/brianc/node-pg-pool#create
  pgPlugin: {
    host: config.PG_HOST,
    port: +config.PG_PORT,
    database: config.PG_DATABASE,
    user: config.PG_USER,
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  secretsManager: {
    strategy: config.SECRETS_STRATEGY,
    secrets: {
      dbPassword: config.SECRETS_PG_PASS
    }
  }
}
