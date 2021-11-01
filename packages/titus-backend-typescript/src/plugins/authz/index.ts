import { FastifyPluginAsync, onRequestHookHandler } from 'fastify'
import fp from 'fastify-plugin'
import { Forbidden } from 'http-errors'
import jwt from 'jsonwebtoken'

declare module 'fastify' {
  export interface FastifyInstance {
    authorizeAdminAccess: onRequestHookHandler
  }
}

const authz: FastifyPluginAsync = async (server) => {
  // add users to the casbin policy with admin role from the email addresses defined in .env
  const adminUsers = process.env.CHECK_AUTHZ_ADMIN_USERS || ''
  const policies = adminUsers
    .split(',')
    .map((u) => server.casbin.addRoleForUser(u, 'role_admin'))
  await Promise.all(policies)

  server.decorate('authorizeAdminAccess', async ({ headers }) => {
    // the idToken contains user details from the auth provider (Auth0, Cognito or AzureAD)
    // different to the accessToken which is used to authenticate the user
    // passing it from the client in a custom header
    const idToken = headers['x-authz-id']
    const authzUserData = jwt.decode(idToken)

    // Here's where the actual policy check goes ahead - based on the user's email in the idToken
    if (
      typeof authzUserData === 'object' &&
      !(await server.casbin.enforce(authzUserData?.email, 'admin', 'access'))
    ) {
      throw new Forbidden('Cannot access admin')
    }
  })
}

export default fp(authz, {
  name: 'authz',
  dependencies: ['fastify-casbin']
})
