'use strict'

const path = require('path')

const helmet = require('fastify-helmet')
const swagger = require('fastify-swagger')
const autoLoad = require('fastify-autoload')
const fp = require('fastify-plugin')

async function plugin(server, config) {
  server
    .register(swagger, require('./config/swagger'))
    // swagger must be registered before helmet
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

module.exports = fp(plugin)
