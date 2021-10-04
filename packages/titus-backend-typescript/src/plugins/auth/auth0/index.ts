import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import fastifyAuth0Verify from 'fastify-auth0-verify'

import auth0Routes from './auth0-routes'

const auth0: FastifyPluginAsync<{
  auth
}> = async (server, options) => {
  server
    .register(fastifyAuth0Verify, options.auth.auth0)
    .register(auth0Routes, options)
}

export default fp(auth0)
export const autoload = false
