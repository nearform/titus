'use strict'
const fp = require('fastify-plugin')
const AWS = require('aws-sdk')

async function authRoutes(server, options) {
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
      const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(
        {
          region: options.auth.cognito.region
        }
      )

      const result = await cognitoIdentityServiceProvider
        .listUsers({
          UserPoolId: options.auth.cognito.userPoolId /* required */
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
}

module.exports = fp(authRoutes)
