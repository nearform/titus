'use strict'

const jwt = require('hapi-auth-jwt2')
const jwksRsa = require('jwks-rsa')

module.exports = {
  name: 'titus-auth0',
  register: async function register (server, options) {
    await server.register(jwt)

    const validate = async function (decoded, request) {
      return { isValid: !!decoded.id }
    }

    server.auth.strategy(
      'jwt',
      'jwt',
      {
        complete: true,
        key: jwksRsa.hapiJwt2Key({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://p16.eu.auth0.com/.well-known/jwks.json`
        }),
        verifyOptions: {
          audience: 'http://localhost:5000',
          issuer: `https://p16.eu.auth0.com/`,
          algorithms: ['RS256']
        },
        validate
      }
    )

    server.route({
      method: 'GET',
      path: '/callback',
      handler: function(request, h) {
        console.log('callback!!')

        return 'Hello, world!'
      },
      options: {
        cors: true,
        auth: false
      }
    })
  }
}