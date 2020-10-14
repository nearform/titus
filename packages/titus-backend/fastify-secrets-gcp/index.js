'use strict'

const { buildPlugin } = require('fastify-secrets-core')

const GcpClient = require('./client')

module.exports = buildPlugin(GcpClient, {
  name: 'fastify-secrets-gcp'
})
