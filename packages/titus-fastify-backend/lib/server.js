const Fastify = require('fastify')
const swagger = require('fastify-swagger')
const pg = require('pg')
require('pg-range').install(pg)
const postgres = require('fastify-postgres')
const GQL = require('fastify-gql')
const cors = require('fastify-cors')

const config = require('../config/default')
const graphql = require('./graphql')
const dbClient = require('./plugins/db-client')

const foodRoutes = require('./routes/rest/food')
const foodGroupRoutes = require('./routes/rest/foodGroup')
const dietTypeRoutes = require('./routes/rest/dietType')

const i18nRoutes = require('./routes/translations')

const server = Fastify({
  logger: config.logger.pino
})

const init = async () => {
  try {
    // Register plugins
    server
      .register(cors, { origin: true })
      .register(postgres, { pg, ...config.db })
      .register(swagger, {
        routePrefix: '/documentation',
        exposeRoute: process.env.NODE_ENV !== 'production',
        swagger: {
          info: config.swagger.info,
          consumes: ['application/json'],
          produces: ['application/json']
        }
      })
      .register(GQL, {
        schema: graphql.schema,
        graphiql: true
      })
      .register(dbClient)

    // Register routes
    server
      .register(foodRoutes)
      .register(foodGroupRoutes)
      .register(dietTypeRoutes)
      .register(i18nRoutes)

    server.decorate('dataloaders', () => {
      return graphql.loaders(server.pg)
    })

    await server.ready()

    server.swagger()

    await server.listen(config.fastify.port, config.fastify.host)

    server.log.info(
      `Server started at ${config.fastify.host}:${config.fastify.port}`
    )
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
