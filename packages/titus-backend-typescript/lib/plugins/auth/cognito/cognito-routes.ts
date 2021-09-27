import fp from 'fastify-plugin'
import AWS from 'aws-sdk'

async function authRoutes(server, { auth }) {
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
      const result = await cognito
        .listUsers({
          UserPoolId: auth.cognito.userPoolId
        })
        .promise()

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
