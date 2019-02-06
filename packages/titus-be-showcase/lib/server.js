'use strict'

const hapi = require('hapi')
const pino = require('hapi-pino')
const HapiSwagger = require('hapi-swagger')
const config = require('../config/default')
const pgPlugin = require('./pg-plugin')
const routes = require('./routes')
const auth0 = require('./auth0')

const server = hapi.server(config.hapi)

const init = async () => {
  await server.register([
    {
      plugin: pino,
      options: config.logger.pino || {}
    },
    {
      plugin: auth0,
      options: config.auth0 || {}
    },
    {
      plugin: pgPlugin,
      options: config.pg
    }
  ])

  if (process.env.NODE_ENV === 'development') {
    await server.register([
      require('inert'),
      require('vision'),
      {
        plugin: HapiSwagger,
        options: config.swagger || {}
      }
    ])
  }

  await server.start()
  server.logger().info(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})

process.on('SIGINT', () => {
  server.stop({ timeout: 10000 }).then(err => {
    process.exit(err ? 1 : 0)
  })
})

server.route(routes(server, config))

module.exports = init
