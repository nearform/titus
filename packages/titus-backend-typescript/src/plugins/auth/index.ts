import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

import auth0 from './auth0'
import azureAD from './azure-ad'
import cognito from './cognito'

const authProviders = {
  auth0,
  azureAD,
  cognito
}

const auth: FastifyPluginAsync<{
  auth
}> = async (server, options) => {
  server.register(authProviders[options.auth.provider], options)
}

export default fp(auth)
