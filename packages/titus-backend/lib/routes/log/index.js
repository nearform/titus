'use strict'

async function log(server, options) {
  server.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          msg: { type: 'string' },
          level: {
            type: 'string',
            enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
          }
        }
      },
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
      const { msg, level = 'info' } = req.body
      req.log[level]({ front: msg })
      return { message: 'logged successfully' }
    }
  })
}

module.exports = log
