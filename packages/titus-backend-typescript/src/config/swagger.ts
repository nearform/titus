const swagger = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Titus swagger',
      description:
        'The documentation of backend for the Titus project using fastify'
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header'
      }
    }
  }
}

module.exports = swagger
