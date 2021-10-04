import path from 'path'

import envSchema from 'env-schema'
import S from 'fluent-json-schema'
import { Static, Type } from '@sinclair/typebox'

const envJsonSchema = Type.Strict(
  Type.Object({
    NODE_ENV: Type.String(),
    API_HOST: Type.String(),
    API_PORT: Type.String(),
    CORS_ORIGIN: Type.Optional(Type.String()),
    ENABLE_ADMIN: Type.Optional(Type.Boolean()),
    PG_HOST: Type.String(),
    PG_PORT: Type.String(),
    PG_DB: Type.String(),
    PG_USER: Type.String(),
    AUTH_PROVIDER: Type.Optional(Type.String()),
    AUTH0_DOMAIN: Type.Optional(Type.String()),
    AUTH0_CLIENT_ID: Type.Optional(Type.String()),
    AUTH0_CLIENT_SECRET: Type.Optional(Type.String()),
    AUTH0_AUDIENCE: Type.Optional(Type.String()),
    AUTH0_GRANT_TYPE: Type.Optional(Type.String()),
    AUTH0_CONNECTION: Type.Optional(Type.String()),
    COGNITO_REGION: Type.Optional(Type.String()),
    COGNITO_USER_POOL_ID: Type.Optional(Type.String()),
    JWT_SECRET: Type.String({ default: '3000' }),
    AD_TENANT: Type.Optional(Type.String()),
    AD_APP_ID: Type.Optional(Type.String()),
    AD_SECRET: Type.Optional(Type.String()),
    SECRETS_STRATEGY: Type.Optional(Type.String()),
    SECRETS_PG_PASS: Type.String(),
    HEALTHCHECK_URL: Type.String({
      default: '/healthcheck'
    }),
    HEALTHCHECK_MAX_HEAP_USER: Type.Number({
      default: 768 * 1024 * 1024
    }), // arbitrary, 768 MB of RA,
    HEALTHCHECK_MAX_RSS: Type.Number({
      default: 1024 * 1024 * 1024
    }), // arbitrary, 1 GB of RA,
    HEALTHCHECK_MAX_EVENT_LOOP_UTILIZATION: Type.Number({
      default: 0.98
    })
  })
)

const config = envSchema<Static<typeof envJsonSchema>>({
  dotenv: true,
  schema: envJsonSchema
})

const routeResponseSchemaOpts = S.object()
  .prop('version', S.string())
  .prop('serverTimestamp', S.string())
  .prop('db', S.string())
  .prop(
    'memoryUsage',
    S.object()
      .prop('eventLoopDelay', S.string())
      .prop('rssBytes', S.string())
      .prop('heapUsed', S.string())
  )
  // @ts-expect-error
  .valueOf().properties

const isProduction = /^\s$production\s*$/i.test(config.NODE_ENV)

// Global configuration, from env variables
export default {
  isProduction,
  server: {
    host: config.API_HOST,
    port: config.API_PORT
  },
  fastify: {
    logger: true
  },
  enableAdmin: config.ENABLE_ADMIN,
  pgPlugin: {
    host: config.PG_HOST,
    port: config.PG_PORT,
    database: config.PG_DB,
    user: config.PG_USER,
    poolSize: 10,
    idleTimeoutMillis: 30000
  },
  underPressure: {
    maxHeapUsedBytes: config.HEALTHCHECK_MAX_HEAP_USER,
    maxRssBytes: config.HEALTHCHECK_MAX_RSS,
    maxEventLoopUtilization: config.HEALTHCHECK_MAX_EVENT_LOOP_UTILIZATION,
    exposeStatusRoute: {
      url: config.HEALTHCHECK_URL,
      routeResponseSchemaOpts
    }
  },
  cors: { origin: !!config.CORS_ORIGIN, credentials: true },
  auth: {
    provider: config.AUTH_PROVIDER || 'auth0',
    azureAD: {
      appID: config.AD_APP_ID,
      secret: config.AD_SECRET,
      tenant: config.AD_TENANT
    },
    auth0: {
      domain: config.AUTH0_DOMAIN,
      clientId: config.AUTH0_CLIENT_ID,
      clientSecret: config.AUTH0_CLIENT_SECRET,
      audience: config.AUTH0_AUDIENCE,
      grantType: config.AUTH0_GRANT_TYPE,
      connection: config.AUTH0_CONNECTION
    },
    cognito: {
      region: config.COGNITO_REGION,
      userPoolId: config.COGNITO_USER_POOL_ID
    }
  },
  jwt: {
    secret: config.JWT_SECRET
  },
  secretsManager: {
    strategy: config.SECRETS_STRATEGY,
    secrets: {
      dbPassword: config.SECRETS_PG_PASS
    }
  },
  casbin: {
    model: path.join(__dirname, 'authz/casbin_model.conf'),
    adapter: path.join(__dirname, 'authz/casbin_policy.csv')
  }
}
