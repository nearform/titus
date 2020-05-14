'use strict'

module.exports = async function (fastify, { name, secrets }) {
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
