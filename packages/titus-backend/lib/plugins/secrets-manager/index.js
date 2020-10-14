'use strict'

const fp = require('fastify-plugin')
const FastifySecrets = require('fastify-secrets')

async function secrets(server, options) {
  server.register(FastifySecrets, {
    strategy: options.secrets.strategy,
    secrets: options.secrets.secrets
  })
}

module.exports = fp(secrets, {
  name: 'secrets'
})
