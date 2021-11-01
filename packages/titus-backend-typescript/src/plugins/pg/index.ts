import pgRange from 'pg-range'
import fp from 'fastify-plugin'
import pg from 'pg'
import { FastifyPluginAsync } from 'fastify'
import fastifyPostgres from 'fastify-postgres'

import configOptions from '../../config'

pgRange.install(pg)

const pgPlugin: FastifyPluginAsync<typeof configOptions> = async (
  server,
  { pgPlugin }
) => {
  server.register(fastifyPostgres, {
    ...pgPlugin,

    password: server.secrets.dbPassword
  })
}

export default fp(pgPlugin, {
  name: 'pg',
  dependencies: ['secrets-manager']
})
