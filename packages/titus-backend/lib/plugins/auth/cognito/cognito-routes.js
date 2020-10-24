'use strict'

const fp = require('fastify-plugin')
const AWS = require('aws-sdk')
const { Forbidden } = require('http-errors')

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

  server.route({
    method: 'DELETE',
    url: '/user/:username',
    schema: {
      tags: ['cognito'],
      security: [
        {
          apiKey: []
        }
      ]
    },
    onRequest: [
      server.authenticate,
      async request => {
        if (!(await server.casbin.enforce(request.user, 'user', 'delete'))) {
          throw new Forbidden('Cannot delete user')
        }
      }
    ],
    handler: request => {
      return cognito
        .adminDeleteUser({
          UserPoolId: options.auth.cognito.userPoolId,
          Username: request.params.username
        })
        .promise()
    }
  })
}

module.exports = fp(authRoutes)
