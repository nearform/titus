'use strict'

const fp = require('fastify-plugin')
const fastifySecretsEnv = require('fastify-secrets-env')

const gcpSecretManager = require('./gcp-secret-manager')

async function fastifyGCPSecretManager(fastify, opts) {
  opts = opts || {}

  const { mode = 'production', ...restOptions } = opts

  switch (mode) {
    case 'production':
      await gcpSecretManager(fastify, restOptions)
      break
    case 'development':
      await fastify.register(fastifySecretsEnv, restOptions)
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
