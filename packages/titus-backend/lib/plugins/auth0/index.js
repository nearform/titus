'use strict'

const fp = require('fastify-plugin')

async function auth0(server, options) {
  server
    .register(require('fastify-auth0-verify'), options.auth0)
    .register(require('./auth0-routes.js'), options)
}

module.exports = fp(auth0)
