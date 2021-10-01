import path from 'path'

import envSchema from 'env-schema'
import S from 'fluent-json-schema'

const envJsonSchema = S.object()
  .prop('NODE_ENV', S.string().required())
  .prop('API_HOST', S.string().required())
  .prop('API_PORT', S.string().required())
  .prop('CORS_ORIGIN', S.string())
  .prop('ENABLE_ADMIN', S.boolean())
  .prop('PG_HOST', S.string().required())
  .prop('PG_PORT', S.string().required())
  .prop('PG_DB', S.string().required())
  .prop('PG_USER', S.string().required())
  .prop('AUTH_PROVIDER', S.string())
  .prop('AUTH0_DOMAIN', S.string())
  .prop('AUTH0_CLIENT_ID', S.string())
  .prop('AUTH0_CLIENT_SECRET', S.string())
  .prop('AUTH0_AUDIENCE', S.string())
  .prop('AUTH0_GRANT_TYPE', S.string())
  .prop('AUTH0_CONNECTION', S.string())
  .prop('COGNITO_REGION', S.string())
  .prop('COGNITO_USER_POOL_ID', S.string())
  .prop('JWT_SECRET', S.string().default('3000'))
  .prop('AD_TENANT', S.string())
  .prop('AD_APP_ID', S.string())
  .prop('AD_SECRET', S.string())
  .prop('SECRETS_STRATEGY', S.string())
  .prop('SECRETS_PG_PASS', S.string().required())
  .prop('HEALTHCHECK_URL', S.string().default('/healthcheck'))
  .prop('HEALTHCHECK_MAX_HEAP_USER', S.number().default(768 * 1024 * 1024)) // arbitrary, 768 MB of RAM
  .prop('HEALTHCHECK_MAX_RSS', S.number().default(1024 * 1024 * 1024)) // arbitrary, 1 GB of RAM
  .prop('HEALTHCHECK_MAX_EVENT_LOOP_UTILIZATION', S.number().default(0.98))

interface IEnv {
  AD_APP_ID?: string
  AD_SECRET?: string
  AD_TENANT?: string
  API_HOST: string
  API_PORT: string
  AUTH0_AUDIENCE?: string
  AUTH0_CLIENT_ID?: string
  AUTH0_CLIENT_SECRET?: string
  AUTH0_CONNECTION?: string
  AUTH0_DOMAIN?: string
  AUTH0_GRANT_TYPE?: string
  AUTH_PROVIDER?: string
  COGNITO_REGION?: string
  COGNITO_USER_POOL_ID?: string
  CORS_ORIGIN?: string
  ENABLE_ADMIN?: boolean
  HEALTHCHECK_MAX_EVENT_LOOP_UTILIZATION?: number
  HEALTHCHECK_MAX_HEAP_USER?: number
  HEALTHCHECK_MAX_RSS?: number
  HEALTHCHECK_URL?: string
  JWT_SECRET?: string
  NODE_ENV: string
  PG_DB: string
  PG_HOST: string
  PG_PORT: string
  PG_USER: string
  SECRETS_PG_PASS: string
  SECRETS_STRATEGY?: string
}

const config = envSchema<IEnv>({
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
