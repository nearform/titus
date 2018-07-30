'use strict'

const axios = require('axios')
const jwt = require('hapi-auth-jwt2')
const jwksRsa = require('jwks-rsa')

module.exports = {
  name: 'titus-auth0',
  register: async function register (server, options) {
    await server.register(jwt)

    const validate = async function (decoded, request) {
      return { isValid: !!decoded.id }
    }

    server.auth.strategy(
      'jwt',
      'jwt',
      {
        complete: true,
        key: jwksRsa.hapiJwt2Key({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://p16.eu.auth0.com/.well-known/jwks.json`
        }),
        verifyOptions: {
          audience: 'http://localhost:5000',
          issuer: `https://p16.eu.auth0.com/`,
          algorithms: ['RS256']
        },
        validate
      }
    )

    server.route({
      method: 'POST',
      path: '/login',
      handler: function(req, h) {
        /**
         * To do this, you nned to make sure you configure your auth0 tenant properly.
         *
         * - add the "Password" grant to your app
         *   (app "Settings" tab -> advance settings at the bottom -> "Grant Types" -> tick "Password")
         * - add a default directoty connection into your tenant https://manage.auth0.com/#/tenant
         *   (click on "connections" in the menu to see your connections)
         *
         * It seems this has been done for security reasons.
         * With this approach you will let another app access in behalf of a user,
         * so you should 100% trust that app.
         */
        const { username, password } = req.payload

        var options = {
          method: 'POST',
          url: 'https://p16.eu.auth0.com/oauth/token',
          headers: { 'content-type': 'application/json' },
          data: {
            grant_type: 'password',
            username,
            password,
            client_id: '678g01xXZy32XNizNfFB3czLVubRA41E',
            client_secret: '21oRbSrsNhEzj9NyW1ypxIRq2GPtl58-y46aTReZZlbMJLu3J50Mr1rTTVE7WFqd'
          }
        }

        return axios(options)
          .then(response => {
            console.log('response.data', response.data)
            return response.data
          })
          .catch(err => console.error(err))
      },
      options: {
        cors: true,
        auth: false,
        tags: ['api', 'login'],
      }
    })
  }
}
