import fp from 'fastify-plugin'

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
    onRequest: [server.authenticate, server.authorizeAdminAccess],
    handler: async ({ user }) => ({
      isAdmin: true,
      user
    })
  })
}
export default fp(authRoutes)
