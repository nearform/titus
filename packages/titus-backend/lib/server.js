'use strict'

const hapi = require('hapi')
const pino = require('hapi-pino')
const graphqlHapi = require('apollo-server-hapi').graphqlHapi
const graphiqlHapi = require('apollo-server-hapi').graphiqlHapi
const config = require('../config/config')
const grapqlSchema = require('./graphql')()
const pgPlugin = require('./pg-plugin')
const routes = require('./routes')

const server = hapi.server(config.hapi)

const init = async () => {
  await server.register([
    {
      plugin: pino,
      options: config.logger.pino || {}
    },
    {
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: req => ({
          endpointURL: '/graphql',
          schema: grapqlSchema,
          context: {
            pg: req.pg
          },
          formatError: err => {
            req.app.gqlError = err
            return err
          }
        })
      }
    },
    {
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        route: {
          auth: false
        },
        graphiqlOptions: req => {
          return {
            endpointURL: '/graphql',
            schema: grapqlSchema
          }
        }
      }
    },
    {
      plugin: pgPlugin,
      options: config.pg
    }
  ])

  await server.start()
  server.logger().info(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

process.on('SIGINT', () => {
  server.stop({ timeout: 10000 }).then(err => {
    process.exit(err ? 1 : 0)
  })
})

server.route(routes(server, config))

module.exports = init
