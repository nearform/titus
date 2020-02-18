'use strict'

const envSchema = require('env-schema')
const S = require('fluent-schema')
const path = require('path')

const config = envSchema({
  dotenv: { path: path.join(__dirname, '..', '.env') },
  schema: S.object()
    .prop('HTTP_HOST', S.string().default('localhost'))
    .prop('HTTP_PORT', S.string().required())
    .prop('NODE_ENV', S.string().required())
    .prop('PGHOST', S.string().required())
    .prop('PGPORT', S.string().required())
    .prop('PGUSER', S.string().required())
    .prop('PGPASSWORD', S.string().required())
    .prop('PGDATABASE', S.string().required())
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
    host: config.PGHOST,
    port: +config.PGPORT,
    database: config.PGDATABASE,
    user: config.PGUSER,
    password: config.PGPASSWORD,
    poolSize: 10,
    idleTimeoutMillis: 30000
  }
}
