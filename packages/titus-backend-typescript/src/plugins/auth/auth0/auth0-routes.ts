import axios from 'axios'
import fp from 'fastify-plugin'
import { Type, Static } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'

import ConfigOptions from '../../../config'

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

interface IJWTPayload {
  access_token: string
  refresh_token: string
  id_token: string
  token_type: string
  expires_in: number
}

const responseJsonSchema = Type.Object({
  username: Type.String(),
  password: Type.String()
})

const authRoutes: FastifyPluginAsync<typeof ConfigOptions> = async (
  server,
  { auth }
) => {
  server
    .route<{
      Body: Static<typeof responseJsonSchema>
    }>({
      method: 'POST',
      url: '/login',
      schema: responseJsonSchema,
      handler: async ({ log, body: { username, password } }, reply) => {
        try {
          const { data } = await axios.request<IJWTPayload>({
            method: 'POST',
            url: `${auth.auth0.domain}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            data: {
              grant_type: auth.auth0.grantType,
              username,
              password,
              client_id: auth.auth0.clientId,
              client_secret: auth.auth0.clientSecret,
              audience: auth.auth0.audience
            }
          })
          return data
        } catch (err: any) {
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
      handler: async ({ user }) => user
    })
}

export default fp(authRoutes)
