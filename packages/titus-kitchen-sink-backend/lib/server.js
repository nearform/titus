'use strict'

const hapi = require('hapi')
const pino = require('hapi-pino')
const HapiSwagger = require('hapi-swagger')
const graphqlHapi = require('apollo-server-hapi').graphqlHapi
const graphiqlHapi = require('apollo-server-hapi').graphiqlHapi
const config = require('../config/default')
const graphqlSchema = require('./graphql').schema
const loaders = require('./graphql').loaders
const pgPlugin = require('./pg-plugin')
const commentamiPlugin = require('./commentami')
const trailPlugin = require('@nearform/trail-hapi-plugin')
const UdaruPlugin = require('@nearform/udaru-hapi-plugin')
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
      options: config.auth0
    },
    {
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        route: {
          cors: true,
          auth: false,
          plugins: {
            pgPlugin: { transactional: true }
          }
        },
        graphqlOptions: req => ({
          endpointURL: '/graphql',
          schema: graphqlSchema,
          context: {
            user: req.headers.authorization,
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
      plugin: pgPlugin,
      options: config.pg
    },
    {
      plugin: trailPlugin,
      options: config.db
    },
    {
      plugin: commentamiPlugin
    },
    {
      plugin: UdaruPlugin,
      options: {
        config: {
          pgdb: config.db
        }
      }
    }
  ])

  if (process.env.NODE_ENV === 'development') {
    await server.register([
      require('inert'),
      require('vision'),
      {
        plugin: HapiSwagger,
        options: config.swagger || {}
      },
      // UI for testing graphql queries - disabled in production
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
              schema: graphqlSchema
            }
          }
        }
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
