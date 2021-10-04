import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import gcp from 'fastify-secrets-gcp'
import aws from 'fastify-secrets-aws'
import env from 'fastify-secrets-env'
import azure from 'fastify-secrets-azure'

const SECRETS_PLUGINS = {
  gcp,
  aws,
  env,
  azure
}

function getPlugin(options) {
  if (!options.secretsManager.strategy) {
    return SECRETS_PLUGINS.env
  }

  return SECRETS_PLUGINS[options.secretsManager.strategy]
}

const secretsManager: FastifyPluginAsync<{
  secretsManager
}> = async (server, options) => {
  const plugin = getPlugin(options)
  if (!plugin) {
    throw new Error(
      `Invalid secrets manager strategy. Choose one of ${Object.keys(
        SECRETS_PLUGINS
      ).join(', ')}`
    )
  }

  if (options.secretsManager.strategy === 'azure') {
    // add required options
    const [vaultName, secretName] =
      options.secretsManager.secrets.dbPassword.split('|')
    options.secretsManager.secrets.dbPassword = secretName
    options.secretsManager.clientOptions = { vaultName }
  }
  server.register(plugin, options.secretsManager)
}

export default fp(secretsManager, {
  name: 'secrets-manager'
})
