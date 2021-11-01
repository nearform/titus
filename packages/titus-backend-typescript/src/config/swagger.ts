import { SwaggerOptions } from 'fastify-swagger'

import { version } from '../../package.json'

const swaggerConfig = {
  staticCSP: true,
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'GXP API Swagger',
      description: 'The documentation for the GXP API microservice.',
      version
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
} as SwaggerOptions

export default swaggerConfig
