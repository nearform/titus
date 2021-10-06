import { FastifyPluginAsync } from 'fastify'

const log: FastifyPluginAsync = async (server) => {
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
    handler: async (req) => {
      const { msg, level = 'info' } = req.body as any
      req.log[level]({ front: msg })
      return { message: 'logged successfully' }
    }
  })
}

export default log
