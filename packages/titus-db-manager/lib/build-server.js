'use strict'

const Fastify = require('fastify')

const buildServer = () => {
  const fastify = Fastify({
    logger: true
  })
  fastify.register(require('./routes'))

  return fastify
}

module.exports = buildServer
