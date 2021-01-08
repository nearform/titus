'use strict'

const { Forbidden } = require('http-errors')
const fp = require('fastify-plugin')

async function authzChecks(server, options) {
  server.route({
    method: 'GET',
    url: '/admin-authzcheck',
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
        const { auth } = options
        let isAdmin = false

        // this is a sample to check the signed-in user's permission to access this resource via casbin policies based on configuration in the OAuth provider
        // a real-world example would have more context around the user account and roles/scopes/permissions and policies

        if (auth.provider === 'auth0') {
          // depending on how this is managed - you could get associated user data from auth0 user management API like https://auth0.com/docs/api/management/v2#!/Users/get_user_roles
          // or set this up to be included in the token via Auth0 rules https://auth0.com/docs/rules
          isAdmin = true
        }

        if (auth.provider === 'cognito') {
          // Cognito includes group information in the token, easy!
          isAdmin = (request.user['cognito:groups'] || []).includes('admin')
        }

        if (auth.provider === 'azureAD') {
          // sorry - haven't made this example yet
          isAdmin = false
        }

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

module.exports = fp(authzChecks)
