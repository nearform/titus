'use strict'
const envSchema = require('env-schema')
const S = require('fluent-schema')

const config = envSchema({
  dotenv: true,
  schema: S.object()
    .prop('NODE_ENV', S.string().required())
    .prop('API_HOST', S.string().required())
    .prop('API_PORT', S.string().required())
    .prop('PG_HOST', S.string().required())
    .prop('PG_PORT', S.string().required())
    .prop('PG_DB', S.string().required())
    .prop('PG_USER', S.string().required())
    .prop('PG_PASS', S.string().required())
    .prop('AUTH_PROVIDER', S.string())
    .prop('AUTH0_DOMAIN', S.string())
    .prop('AUTH0_CLIENT_ID', S.string())
    .prop('AUTH0_CLIENT_SECRET', S.string())
    .prop('AUTH0_AUDIENCE', S.string())
    .prop('AUTH0_GRANT_TYPE', S.string())
    .prop('COGNITO_REGION', S.string())
    .prop('COGNITO_USER_POOL_ID', S.string())
    .prop('JWT_SECRET', S.string().default('3000'))
    .prop('AD_TENANT', S.string())
    .prop('AD_APP_ID', S.string())
    .prop('AD_SECRET', S.string())
    .prop('CORS_ORIGIN', S.string())
    .prop('SECRETS_TEST', S.string())
})

const isProduction = /^\s$production\s*$/i.test(config.NODE_ENV)

// Global configuration, from env variables
module.exports = {
  isProduction,
  server: {
    host: config.API_HOST,
    port: config.API_PORT
  },
  fastify: {
    logger: true
  },
  pgPlugin: {
    host: config.PG_HOST,
    port: config.PG_PORT,
    database: config.PG_DB,
    user: config.PG_USER,
    password: config.PG_PASS,
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  underPressure: {},
  cors: { origin: !!config.CORS_ORIGIN },
  auth: {
    provider: config.AUTH_PROVIDER || 'auth0',
    azureAD: {
      appID: config.AD_APP_ID,
      secret: config.AD_SECRET,
      tenant: config.AD_TENANT
    },
    auth0: {
      domain: `https://${config.AUTH0_DOMAIN}`,
      clientId: config.AUTH0_CLIENT_ID,
      clientSecret: config.AUTH0_CLIENT_SECRET,
      audience: config.AUTH0_AUDIENCE,
      grantType: config.AUTH0_GRANT_TYPE
    },
    cognito: {
      region: config.COGNITO_REGION,
      userPoolId: config.COGNITO_USER_POOL_ID
    }
  },
  jwt: {
    secret: config.JWT_SECRET
  },
  secretManager: {
    test: 'projects/494141678371/secrets/test/versions/latest'
  },
  developmentSecrets: {
    test: config.SECRETS_TEST
  }
}
