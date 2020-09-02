'use strict'
const fp = require('fastify-plugin')

async function authRoutes(server, options) {
  server.route({
    method: 'GET',
    url: '/auth',
    schema: {
      tags: ['cognito'],
      security: [
        {
          apiKey: []
        }
      ]
    },
    onRequest: server.authenticate,
    handler: async ({ log, user }) => {
      return user || 'NO USER'
    }
  })
}

module.exports = fp(authRoutes)
