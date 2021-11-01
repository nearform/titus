import fp from 'fastify-plugin'
import AWS from 'aws-sdk'
import { FastifyPluginAsync } from 'fastify'

import { configOptions } from '../../../config'

const authRoutes: FastifyPluginAsync<typeof configOptions> = async (
  server,
  { auth }
) => {
  const cognito = new AWS.CognitoIdentityServiceProvider({
    region: auth.cognito.region
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
    handler: async ({ user }) => user || 'NO USER'
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
      const result = auth?.cognito?.userPoolId
        ? await cognito
            .listUsers({
              UserPoolId: auth.cognito.userPoolId
            })
            .promise()
        : await cognito.listUsers().promise()

      return result.Users?.map((user) => ({
        username: user.Username,
        email: (user.Attributes?.find(({ Name }) => Name === 'email') || {})
          .Value,
        createdAt: user.UserCreateDate,
        enabled: user.Enabled,
        status: user.UserStatus
      }))
    }
  })
}

export default fp(authRoutes)
