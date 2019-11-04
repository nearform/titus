'use strict'

const fp = require('fastify-plugin')

async function user(server, options) {
  server.route({
    method: 'GET',
    url: '/user',
    handler: async (req, res) => {
      return req.user
    }
  })
}

module.exports = fp(user)
