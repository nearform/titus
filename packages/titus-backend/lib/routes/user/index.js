'use strict'

async function user(server, options) {
  server.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['user'],
      security: [
        {
          apiKey: []
        }
      ],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        400: {
          description: 'Bad request: authorization token authentication',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async (req, res) => {
      return req.user
    }
  })
}

module.exports = user
