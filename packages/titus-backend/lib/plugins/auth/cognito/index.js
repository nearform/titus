'use strict'

const fp = require('fastify-plugin')

async function cognito(server, options) {
  console.log('Register COGNITO')
}

module.exports = fp(cognito)
