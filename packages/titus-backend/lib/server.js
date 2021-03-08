'use strict'

const path = require('path')

const autoLoad = require('fastify-autoload')
const fp = require('fastify-plugin')

async function plugin(server, config) {
  server
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
