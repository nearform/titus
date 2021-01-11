'use strict'

const fp = require('fastify-plugin')
const AWS = require('aws-sdk')
const { Forbidden } = require('http-errors')
const jwt = require('jsonwebtoken')

async function authRoutes(server, options) {
  const cognito = new AWS.CognitoIdentityServiceProvider({
    region: options.auth.cognito.region
  })

  server.route({
    method: 'GET',
    url: '/auth',
    schema: {
      tags: ['cognito'],
      security: [
        {
          apiKey: []
        }
      ]
    },
    onRequest: server.authenticate,
    handler: async ({ user }) => {
      return user || 'NO USER'
    }
  })

  // This endpoint was created to test the cognito integration
  // The policies to access the UserPool are defined in the CDK deploy script
  server.route({
    method: 'GET',
    url: '/userlist',
    schema: {
      tags: ['cognito'],
      security: [
        {
          apiKey: []
        }
      ]
    },
    onRequest: server.authenticate,
    handler: async () => {
      const result = await cognito
        .listUsers({
          UserPoolId: options.auth.cognito.userPoolId
        })
        .promise()

      return result.Users.map(user => ({
        username: user.Username,
        email: (
          user.Attributes.find(attribute => attribute.Name === 'email') || {}
        ).Value,
        createdAt: user.UserCreateDate,
        enabled: user.Enabled,
        status: user.UserStatus
      }))
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
        // Cognito includes group information in the token, so it could be easy! (NOTE: in real world apps to be sure the auth token is verified!)
        // for now we are faking it with env var matched email addresses to the id token
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
