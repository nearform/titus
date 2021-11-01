import fp from 'fastify-plugin'
import buildGetJwks from 'get-jwks'
import fastifyJwt from 'fastify-jwt'
import { FastifyPluginAsync } from 'fastify'

import configOptions from '../../../config'

import cognitoRoutes from './cognito-routes'

function authenticate(request) {
  return request.jwtVerify()
}

const cognito: FastifyPluginAsync<typeof configOptions> = async (
  server,
  options
) => {
  const getJwks = buildGetJwks()

  server.register(fastifyJwt, {
    decode: { complete: true },
    secret: (_, token, callback) => {
      const {
        // @ts-expect-error TODO
        header: { kid, alg },
        // @ts-expect-error TODO
        payload: { iss }
      } = token

      getJwks
        .getPublicKey({ kid, domain: iss, alg })
        .then((publicKey) => callback(null, publicKey), callback)
    }
  })

  server.decorate('authenticate', authenticate)
  server.register(cognitoRoutes, options)
}

export default fp(cognito)
export const autoload = false
