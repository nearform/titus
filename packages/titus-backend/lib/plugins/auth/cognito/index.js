'use strict'

const { Unauthorized } = require('http-errors')
const fp = require('fastify-plugin')

const errorMessages = {
  badHeaderFormat: 'Authorization header should be in format: Bearer [token].',
  expiredToken: 'Expired token.',
  invalidAlgorithm: 'Unsupported token.',
  invalidToken: 'Invalid token.',
  jwksHttpError: 'Unable to get the JWS due to a HTTP error',
  missingHeader: 'Missing Authorization HTTP header.',
  missingKey: 'No matching key found in the set.',
  missingOptions:
    'Please provide at least one of the "domain" or "secret" options.'
}

async function authenticate(request) {
  try {
    if (!request.headers || !request.headers.authorization) {
      throw new Unauthorized(errorMessages.missingHeader)
    }

    const authorization = request.headers.authorization

    if (!authorization.match(/^Bearer\s+/)) {
      throw new Unauthorized(errorMessages.badHeaderFormat)
    }

    request.user = this.jwt.decode(authorization.split(/\s+/)[1].trim())
  } catch (e) {
    if (e.statusCode) {
      throw e
    }

    throw new Unauthorized(e.message)
  }
}

async function cognito(server, options) {
  server.decorate('authenticate', authenticate)
  server.register(require('./cognito-routes'), options)
}

module.exports = fp(cognito)
module.exports.autoload = false
