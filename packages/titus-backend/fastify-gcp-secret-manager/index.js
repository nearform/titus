'use strict'

const fp = require('fastify-plugin')

const setup = {
  development: require('./development'),
  production: require('./production')
}

async function fastifyGCPSecretManager(fastify, opts) {
  opts = opts || {}

  const mode = opts.mode || 'production'

  delete opts.mode

  switch (mode) {
    case 'production':
      await setup.production(fastify, opts)
      break
    case 'development':
      await setup.development(fastify, opts)
      break
    default:
      throw new Error(
        "unsupported mode, should be one of ['production', 'development']"
      )
  }
}

module.exports = fp(fastifyGCPSecretManager, {
  fastify: '2.x',
  name: 'fastify-gcp-secret-manager'
})
