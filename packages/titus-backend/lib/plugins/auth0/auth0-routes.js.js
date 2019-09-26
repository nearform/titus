'use strict'

const axios = require('axios')
const fp = require('fastify-plugin')

/**
 * Registers an JSON Web Token authentication stratgy (named 'jwt')
 * and a login route to authenticate users against Auth0.
 * You need to make sure you configure your auth0 tenant correctly.
 *
 * - add the "Password" grant to your app
 *   (app "Settings" tab -> advance settings at the bottom -> "Grant Types" -> tick "Password")
 * - add a default directoty connection into your tenant https://manage.auth0.com/#/tenant
 *   (click on "connections" in the menu to see your connections)
 *
 * @async
 * @param {Fastify.Server} server       - in which stratgy and routes are registered
 * @param {Object} options              - plugin options:
 * @param {String} options.domain       - Auth0 domain (ie: nf-titus.auth0.com)
 * @param {String} options.clientId     - your Auth0 app id
 * @param {String} options.clientSecret - your Auth0 app secret
 * @param {String} options.audience     - optional audienc you'd like to restrict access to
 * @param {Object} options.key          - JWKS-rsa plugin options
 * @see https://github.com/auth0/node-jwks-rsa#usage
 */

async function authRoutes(server, options) {
  server
    .route({
      method: 'POST',
      url: '/login',
      handler: async ({ log, body: { username, password } }, reply) => {
        try {
          const { data } = await axios({
            method: 'POST',
            url: `${options.auth0.domain}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            data: {
              grant_type: options.auth0.grantType,
              username,
              password,
              client_id: options.auth0.clientId,
              client_secret: options.auth0.clientSecret,
              audience: options.auth0.audience
            }
          })
          const token = server.jwt.sign(data)
          return { token }
        } catch (err) {
          const details =
            (err.response &&
              err.response.data &&
              err.response.data.error_description) ||
            err.message
          log.warn(
            {
              response: {
                ...err.response,
                request: undefined
              }
            },
            `Fail to authenticate: ${details}`
          )
          reply.code(403).send(details)
        }
      }
    })
    .route({
      method: 'GET',
      url: '/auth',
      preHandler: server.auth([server.verifyJWT]),
      handler: async ({ log, user }) => {
        return user
      }
    })
}

module.exports = fp(authRoutes)
