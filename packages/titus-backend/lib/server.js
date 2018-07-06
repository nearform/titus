'use strict'

const hapi = require('hapi')
const pino = require('hapi-pino')
const graphqlHapi = require('apollo-server-hapi').graphqlHapi
const graphiqlHapi = require('apollo-server-hapi').graphiqlHapi
const config = require('../config/default')
const grapqlSchema = require('./graphql').schema
const loaders = require('./graphql').loaders
const pgPlugin = require('./pg-plugin')
const trailPlugin = require('@nearform/trail-hapi-plugin')
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
        route: {
          cors: true,
          plugins: {
            'pgPlugin': { transactional: true }
          }
        },
        graphqlOptions: req => ({
          endpointURL: '/graphql',
          schema: grapqlSchema,
          context: {
            pg: req.pg,
            loaders: loaders(req.pg)
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
    },
    {
      plugin: trailPlugin,
      options: config.db
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
