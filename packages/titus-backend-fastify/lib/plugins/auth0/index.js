'use strict'

const fp = require('fastify-plugin')

async function auth0(server, options) {
  server
    .register(require('fastify-jwt'), {
      secret: options.jwt.secret
    })
    .decorate('verifyJWT', async function(request, reply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })
    .register(require('fastify-auth'))
}

module.exports = fp(auth0)
