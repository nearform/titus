import { FastifyPluginAsync } from 'fastify'

const user: FastifyPluginAsync = async (server) => {
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
    handler: async (req) => req.user
  })
}

export default user
