'use strict'

const fp = require('fastify-plugin')

async function secrets(server, options) {
  server.register(require('fastify-gcp-secret-manager'), {
    ...options.secretManager,
    mode: options.isProduction ? 'production' : 'development',
    developmentSecrets: options.developmentSecrets
  })
}

module.exports = fp(secrets)
