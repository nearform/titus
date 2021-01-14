'use strict'

const fp = require('fastify-plugin')
const { Forbidden } = require('http-errors')
const jwt = require('jsonwebtoken')

async function authRoutes(server, options) {
  // add users to the admin role
  server.addHook('onReady', async function () {
    const adminUsers = process.env.CHECK_AUTHZ_ADMIN_USERS || ''
    const policies = adminUsers
      .split(',')
      .map(u => server.casbin.addRoleForUser(u, 'role_admin'))
    await Promise.all(policies)
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
        const authzId = request.headers['x-authz-id']
        const authzUserData = jwt.decode(authzId)
        // we added the user to role with admin access above in the server.onReady hook
        // Here's where the actual policy check goes ahead - based on the user's email
        if (
          !(await server.casbin.enforce(authzUserData.email, 'admin', 'access'))
        ) {
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
