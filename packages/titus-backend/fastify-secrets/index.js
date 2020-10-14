'use strict'

const fp = require('fastify-plugin')

const PLUGINS = {
  env: require('fastify-secrets-env'),
  gcp: require('fastify-secrets-gcp')
}

function getPlugin (strategy) {
  return PLUGINS[strategy] || throw new Error(`Unsupported mode, should be one of [${Object.keys(PLUGINS).join(', ')}]`)
}

async function FastifySecrets(fastify, opts) {
  opts = opts || {}
  const plugin = getPlugin(opts.strategy)

  return fastify.register(plugin, opts)
}

module.exports = fp(FastifySecrets, {
  fastify: '2.x',
  name: 'fastify-secrets'
})
