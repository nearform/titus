'use strict'

const axios = require('axios')
const fp = require('fastify-plugin')
const { Forbidden } = require('http-errors')
const jwt = require('jsonwebtoken')

/**
 * Registers an JSON Web Token authentication strategy (named 'jwt')
 * and a login route to authenticate users against Auth0.
 * You need to make sure you configure your auth0 tenant correctly.
 *
 * - add the "Password" grant to your app
 *   (app "Settings" tab -> advance settings at the bottom -> "Grant Types" -> tick "Password")
 * - add a default directory connection into your tenant https://manage.auth0.com/#/tenant
 *   (click on "connections" in the menu to see your connections)
 *
 * @async
 * @param {Fastify.Server} server       - in which strategy and routes are registered
 * @param {Object} options              - plugin options:
 * @param {String} options.domain       - Auth0 domain (ie: nf-titus.auth0.com)
 * @param {String} options.clientId     - your Auth0 app id
 * @param {String} options.clientSecret - your Auth0 app secret
 * @param {String} options.audience     - optional audience you'd like to restrict access to
 * @param {Object} options.key          - JWKS-rsa plugin options
 * @see https://github.com/auth0/node-jwks-rsa#usage
 */

async function authRoutes(server, options) {
  server
    .route({
      method: 'POST',
      url: '/login',
      schema: {
        tags: ['auth0'],
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' }
          }
        }
      },
      handler: async ({ log, body: { username, password } }, reply) => {
        try {
          const { data } = await axios({
            method: 'POST',
            url: `${options.auth.auth0.domain}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            data: {
              grant_type: options.auth.auth0.grantType,
              username,
              password,
              client_id: options.auth.auth0.clientId,
              client_secret: options.auth.auth0.clientSecret,
              audience: options.auth.auth0.audience
            }
          })
          return data
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
      schema: {
        tags: ['auth0'],
        security: [
          {
            apiKey: []
          }
        ]
      },
      onRequest: server.authenticate,
      handler: async ({ log, user }) => {
        return user
      }
    })

  // this is a sample to check the signed-in user's permission to access this resource via casbin policies based on configuration in the OAuth provider
  // a real-world example would have more context around the user account and roles/scopes/permissions and policies
  server.route({
    method: 'GET',
    url: '/authzcheck',
    schema: {
      tags: ['authz'],
      security: [
        {
          apiKey: []
        }
      ]
    },
    onRequest: [
      server.authenticate,
      async (request, res) => {
        // TODO: mechanism to determine auth0 users role
        // depending on how this is managed - you could get associated user data from auth0 user management API like https://auth0.com/docs/api/management/v2#!/Users/get_user_roles
        // or set this up to be included in the token via Auth0 rules https://auth0.com/docs/rules
        // for now we are faking it with env var matched email addresses
        const authzId = request.headers['x-authz-id']
        const authzUserData = jwt.decode(authzId)
        const adminUsers = process.env.CHECK_AUTHZ_ADMIN_USERS || ''
        const isAdmin = adminUsers.split(',').includes(authzUserData.email)

        // Here's where the actual policy check goes ahead
        if (!(await server.casbin.enforce({ isAdmin }, 'admin', 'access'))) {
          throw new Forbidden('Cannot access admin')
        }
      }
    ],
    handler: async req => {
      return {
        isAdmin: true,
        user: req.user
      }
    }
  })
}

module.exports = fp(authRoutes)
