import path from 'path'

import helmet from 'fastify-helmet'
import swagger from 'fastify-swagger'
import autoLoad from 'fastify-autoload'
import fp from 'fastify-plugin'

async function plugin(server, config) {
  server
    // swagger must be registered before helmet
    .register(swagger, require('./config/swagger'))
    .register(helmet, ({ swaggerCSP }) => ({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'form-action': [`'self'`],
          'img-src': [`'self'`, 'data:', 'validator.swagger.io'],
          'script-src': [`'self'`].concat(swaggerCSP.script),
          'style-src': [`'self'`, 'https:'].concat(swaggerCSP.style)
        }
      }
    }))
    .register(require('fastify-cors'), config.cors)
    .register(require('fastify-casbin'), config.casbin)
    .register(autoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: config
    })
    .register(autoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: config
    })

  if (config.enableAdmin) {
    await server.register(require('@nearform/brokeneck-fastify'), config.auth)
  }
}

export default fp(plugin)
