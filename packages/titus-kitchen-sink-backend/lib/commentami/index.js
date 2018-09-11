'use strict'

const config = require('../../config/default')

const users = {
  john: {
    id: 1,
    username: 'john',
    name: 'John Smith'
  },
  jane: {
    id: 2,
    username: 'jane',
    name: 'John Doe'
  },
  titus: {
    id: 3,
    username: 'titus',
    name: 'Titus User'
  }
}

const passwords = {
  john: 'john',
  jane: 'jane',
  titus: 'titus'
}

const validate = async (request, username, password, h) => {
  const user = users[username]

  if (!user) {
    return { credentials: null, isValid: false }
  }

  const isValid = password === passwords[username]

  return { isValid, credentials: users[username] }
}

module.exports = {
  name: 'titus-commentami',
  register: async function register (server, options) {
    await server.register(require('hapi-auth-basic'))

    server.auth.strategy('simple', 'basic', { validate })

    await server.register({
      plugin: require('@nearform/commentami-backend-hapi-plugin'),
      options: {
        pg: config.db,
        nes: {
          auth: {
            route: 'simple'
          }
        },
        routes: {
          cors: true,
          auth: 'simple',
          getUserFromRequest: async (request, payload) => {
            return request.auth.credentials
          }
        },
        multines: {
          type: 'redis',
          host: config.redis.host,
          port: config.redis.port
        }
      }
    })
  }
}
