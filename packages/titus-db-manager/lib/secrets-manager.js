'use strict'

const fp = require('fastify-plugin')
const SECRETS_PLUGINS = {
  gcp: require('fastify-secrets-gcp'),
  aws: require('fastify-secrets-aws'),
  env: require('fastify-secrets-env')
}

const config = require('./config')

function getPlugin() {
  if (!config.secretsManager.strategy) {
    return SECRETS_PLUGINS.env
  }

  return SECRETS_PLUGINS[config.secretsManager.strategy]
}

async function secretsManager(server) {
  const plugin = getPlugin()
  if (!plugin) {
    throw new Error(
      `Invalid secrets manager strategy. Choose one of ${Object.keys(
        SECRETS_PLUGINS
      ).join(', ')}`
    )
  }
  server.register(plugin, config.secretsManager)
}

module.exports = fp(secretsManager, {
  name: 'secrets-manager'
})
