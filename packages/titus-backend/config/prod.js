const {
  API_HOST,
  API_PORT,
  PGHOST,
  PGPORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
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

module.exports = {
  logLevel: 'info',
  isProduction: /^\s$production\s*$/i.test(NODE_ENV),
  hapi: {
    host: API_HOST || null,
    port: API_PORT || 5000
  },
  db: {
    host: PGHOST || null,
    port: PGPORT || 5432,
    database: POSTGRES_DB || 'titus',
    username: POSTGRES_USER || 'titus',
    password: POSTGRES_PASSWORD || 'titus',
    poolSize: 10,
    idleTimeoutMillis: 30000
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
