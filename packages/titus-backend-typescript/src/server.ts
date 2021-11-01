import path from 'path'

import swagger from 'fastify-swagger'
import autoLoad from 'fastify-autoload'
import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import fastifyCors from 'fastify-cors'
import brokeneckFastify from '@nearform/brokeneck-fastify'
import casbin from 'fastify-casbin'

import configOptions from './config'

const serverPlugin: FastifyPluginAsync<typeof configOptions> = async (
  server,
  config
) => {
  server
    // swagger must be registered before helmet
    .register(swagger, config.swagger)
    .register(fastifyCors, config.cors)
    .register(casbin, config.casbin)
    .register(autoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: config
    })
    .register(autoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: config
    })

  if (config.enableAdmin) {
    await server.register(brokeneckFastify, config.auth)
  }
}

export default fp(serverPlugin)
