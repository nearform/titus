const axios = require('axios')
const jwt = require('hapi-auth-jwt2')
const jwksRsa = require('jwks-rsa')
const { forbidden } = require('boom')

module.exports = {
  name: 'auth0',
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
   * @param {Hapi.Server} server        - in which stratgy and routes are registered
   * @param {Object} options            - plugin options:
   * @param {String} options.domain       - Auth0 domain (ie: nf-titus.auth0.com)
   * @param {String} options.clientId     - your Auth0 app id
   * @param {String} options.clientSecret - your Auth0 app secret
   * @param {String} options.audience     - optional audienc you'd like to restrict access to
   * @param {Object} options.key          - JWKS-rsa plugin options
   * @see https://github.com/auth0/node-jwks-rsa#usage
   */
  register: async (server, options) => {
    await server.register(jwt)

    server.auth.strategy('jwt', 'jwt', {
      complete: true,
      key: jwksRsa.hapiJwt2KeyAsync(options.key),
      verifyOptions: {
        audience: options.audience,
        issuer: `${options.domain}/`,
        algorithms: ['RS256']
      },
      validate: async decoded => ({ isValid: !!decoded.id })
    })

    server.route({
      method: 'POST',
      path: '/login',
      handler: async ({ logger, payload: { username, password } }) => {
        try {
          const { data } = await axios({
            method: 'POST',
            url: `${options.domain}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            data: {
              grant_type: 'password',
              username,
              password,
              client_id: options.clientId,
              client_secret: options.clientSecret
            }
          })
          return data
        } catch (err) {
          const details =
            (err.response &&
              err.response.data &&
              err.response.data.error_description) ||
            err.message
          logger.warn(
            {
              response: {
                ...err.response,
                request: undefined
              }
            },
            `Fail to authenticate: ${details}`
          )
          return forbidden(details)
        }
      },
      options: {
        cors: true,
        auth: false
      }
    })
  }
}
