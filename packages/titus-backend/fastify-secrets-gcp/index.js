'use strict'

const { buildPlugin } = require('fastify-secrets-core')
const GcpClient = require('./client')

module.exports = buildPlugin(GcpClient, {
  fastify: '2.x',
  name: 'fastify-secrets-gcp'
})
