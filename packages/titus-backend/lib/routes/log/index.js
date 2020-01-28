'use strict'

const fp = require('fastify-plugin')

async function log(server, options) {
  server.route({
    method: 'POST',
    url: '/log',
    schema: {
      tags: ['log'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async (req, res) => {
      const { msg } = req.body
      req.log.info(msg)
      return res.code(200)
    }
  })
}

module.exports = fp(log)
