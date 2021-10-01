import pgRange from 'pg-range'
import fp from 'fastify-plugin'
pgRange.install(require('pg'))

async function plugin(server, { pgPlugin }) {
  server.register(require('fastify-postgres'), {
    ...pgPlugin,
    password: server.secrets.dbPassword
  })
}

export default fp(plugin, {
  name: 'pg',
  dependencies: ['secrets-manager']
})
