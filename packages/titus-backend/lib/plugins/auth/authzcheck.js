'use strict'

const fp = require('fastify-plugin')
const { Forbidden } = require('http-errors')
const jwt = require('jsonwebtoken')

async function authRoutes(server, options) {
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
