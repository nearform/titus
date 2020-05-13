'use strict'

const SecretManagerServiceClient = require('@google-cloud/secret-manager')
  .SecretManagerServiceClient
const fp = require('fastify-plugin')
const envSchema = require('env-schema')
const S = require('fluent-schema')

const config = envSchema({
  dotenv: true,
  schema: S.object().prop('NODE_ENV', S.string().required())
})

const isProduction = config.NODE_ENV === 'production'
let client

async function accessSecretVersion(name) {
  try {
    const [version] = await client.accessSecretVersion({ name })
    return version.payload.data.toString('utf8')
  } catch (err) {
    // the error message from GCP SDK should get propagated to user as it contain path to the secret, project ID, etc..
    throw new Error(`Secret not found: ${name}`)
  }
}

async function fastifyGCPSecretManager(fastify, options) {
  const { name, developmentSecrets } = options
  delete options.name
  delete options.developmentSecrets

  if (!client) {
    client = new SecretManagerServiceClient()
  }

  const secrets = {}
  for (const key in options) {
    if (isProduction) {
      // in Production the secrets are read from GCP
      secrets[key] = await accessSecretVersion(options[key])
    } else {
      // in development the secrets are read from an `options.developmentSecrets`
      if (developmentSecrets[key]) {
        secrets[key] = developmentSecrets[key]
      } else {
        // if development secret is not set it will throw an error
        throw new Error(`Development secret not found: ${key}`)
      }
    }
  }

  if (name) {
    if (!fastify.secrets) {
      fastify.decorate('secrets', {})
    }

    if (fastify.secrets[name]) {
      throw new Error(
        `fastify-gcp-secret-manager '${name}' instance name has already been registered`
      )
    }

    fastify.secrets[name] = secrets
  } else {
    if (fastify.secrets) {
      throw new Error('fastify-gcp-secret-manager has already been registered')
    } else {
      fastify.decorate('secrets', secrets)
    }
  }
}

module.exports = fp(fastifyGCPSecretManager, {
  fastify: '2.x',
  name: 'fastify-gcp-secret-manager'
})
