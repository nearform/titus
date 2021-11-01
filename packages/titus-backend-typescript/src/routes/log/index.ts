import { Type, Static } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'

const BodyType = Type.Strict(
  Type.Object({
    msg: Type.String(),
    level: Type.KeyOf(
      Type.Object({
        trace: Type.String(),
        debug: Type.String(),
        info: Type.String(),
        warn: Type.String(),
        error: Type.String(),
        fatal: Type.String()
      })
    )
  })
)

const log: FastifyPluginAsync = async (server) => {
  server.route<{ Body: Static<typeof BodyType> }>({
    method: 'POST',
    url: '/',
    schema: {
      body: BodyType,
      tags: ['log'],
      response: {
        200: Type.Strict(
          Type.Object({
            message: Type.String({
              description: 'Successful response'
            })
          })
        )
      }
    },
    handler: async (req) => {
      const { msg, level = 'info' } = req.body
      req.log[level]({ front: msg })
      return { message: 'logged successfully' }
    }
  })
}

export default log
