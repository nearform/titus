'use strict'

const fp = require('fastify-plugin')

async function auth0(server, options) {
  server
    .register(require('fastify-auth0-verify'), options.auth.auth0)
    .register(require('./auth0-routes'), options)
}

module.exports = fp(auth0)
