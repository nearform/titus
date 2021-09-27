import fp from 'fastify-plugin'
import buildGetJwks from 'get-jwks'

function authenticate(request) {
  return request.jwtVerify()
}

async function cognito(server, options) {
  const getJwks = buildGetJwks()

  server.register(require('fastify-jwt'), {
    decode: { complete: true },
    secret: (_, token, callback) => {
      const {
        header: { kid, alg },
        payload: { iss }
      } = token

      getJwks
        .getPublicKey({ kid, domain: iss, alg })
        .then((publicKey) => callback(null, publicKey), callback)
    }
  })

  server.decorate('authenticate', authenticate)
  server.register(require('./cognito-routes'), options)
}

export default fp(cognito)
export const autoload = false
