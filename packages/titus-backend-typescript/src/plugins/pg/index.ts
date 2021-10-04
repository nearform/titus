import pgRange from 'pg-range'
import fp from 'fastify-plugin'
import pg from 'pg'
import { FastifyPluginAsync } from 'fastify'
import fastifyPostgres from 'fastify-postgres'

pgRange.install(pg)

const pgPlugin: FastifyPluginAsync<{
  pgPlugin
}> = async (server, { pgPlugin }) => {
  server.register(fastifyPostgres, {
    ...pgPlugin,
    // @ts-expect-error
    password: server.secrets.dbPassword
  })
}

export default fp(pgPlugin, {
  name: 'pg',
  dependencies: ['secrets-manager']
})
