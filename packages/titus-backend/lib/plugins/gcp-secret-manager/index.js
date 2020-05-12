'use strict'

const fp = require('fastify-plugin')

async function secrets(server, options) {
  server.register(require('fastify-gcp-secret-manager'), options.secretManager)
}

module.exports = fp(secrets)
module.exports.autoload = false
