'use strict'

const fp = require('fastify-plugin')

const authProviders = {
  auth0: require('./auth0'),
  azureAD: require('./azure-ad'),
  cognito: require('./cognito')
}

async function auth(server, options) {
  server.register(authProviders[options.auth.provider], options)
  server.register(require('./authzcheck'), options)
}

module.exports = fp(auth)
