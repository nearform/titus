import fp from 'fastify-plugin'

async function auth0(server, options) {
  server
    .register(require('fastify-auth0-verify'), options.auth.auth0)
    .register(require('./auth0-routes'), options)
}

export default fp(auth0)
export const autoload = false
