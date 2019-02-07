'use strict'
const axios = require('axios')
const jwt = require('hapi-auth-jwt2')
const jwksRsa = require('jwks-rsa')

module.exports = {
  name: 'titus-auth0',
  register: async function register(server, options) {
    await server.register(jwt)

    const validate = async function(decoded) {
      return { isValid: !!decoded.id }
    }

    server.auth.strategy('jwt', 'jwt', {
      complete: true,
      key: jwksRsa.hapiJwt2Key(options.key),
      verifyOptions: {
        audience: options.audience,
        issuer: `${options.domain}/`,
        algorithms: ['RS256']
      },
      validate
    })

    /**
     * To do this, you need to make sure you configure your auth0 tenant correctly.
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
    server.route({
      method: 'POST',
      path: '/login',
      handler: function(req) {
        const { username, password } = req.payload
        const r = {
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
        }

        return axios(r)
          .then(response => response.data)
          .catch(err => console.error(err))
      },
      options: {
        cors: true,
        auth: false,
        tags: ['api', 'login']
      }
    })
  }
}
