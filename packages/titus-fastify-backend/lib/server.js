'use strict'

const Fastify = require('fastify')
const swagger = require('fastify-swagger')

const config = require('../config/default')

// const graphqlSchema = require('./graphql').schema
// const loaders = require('./graphql').loaders
const dbClient = require('./plugins/db-client')

const foodRoutes = require('./routes/rest/food')
const foodHistoryRoutes = require('./routes/rest/foodHistory')
const foodGroupRoutes = require('./routes/rest/foodGroup')
const dietTypeRoutes = require('./routes/rest/dietType')

const server = Fastify({
  logger: config.logger.pino
})

const init = async () => {
  try {
    // Register plugins
    server
      .register(require('fastify-postgres'), config.db)
      .register(swagger, {
        routePrefix: '/documentation',
        exposeRoute: process.env.NODE_ENV !== 'production',
        swagger: {
          info: config.swagger.info,
          consumes: ['application/json'],
          produces: ['application/json']
        }
      })
      .register(dbClient)

    // Register routes
    server
      .register(foodRoutes)
      .register(foodHistoryRoutes)
      .register(foodGroupRoutes)
      .register(dietTypeRoutes)

    await server.ready()

    server.swagger()

    await server.listen(config.fastify.port, config.fastify.host)

    server.log.info(`Server started at ${config.fastify.host}:${config.fastify.port}`)
  } catch (err) {
    server.log.error(err)

    process.exit(1)
  }
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

// process.on('SIGINT', () => {
//   // TODO graceful server stop with kill on timeout (10s)
// })

module.exports = init
