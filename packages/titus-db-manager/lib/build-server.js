'use strict'

const Fastify = require('fastify')

const SecretsManager = require('./secrets-manager')

const buildServer = config => {
  const fastify = Fastify({
    logger: true
  })
  fastify.register(SecretsManager)
  fastify.register(require('./routes'))

  return fastify
}

module.exports = buildServer
