'use strict'

const fp = require('fastify-plugin')

async function secrets(server, options) {
  server.register(require('fastify-gcp-secret-manager'), options.gcpSecretManager)
}

module.exports = fp(secrets)
