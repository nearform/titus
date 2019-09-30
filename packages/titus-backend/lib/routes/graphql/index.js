'use strict'

const fp = require('fastify-plugin')
const http = require('http')
const https = require('http')
const { HASURA_ENDPOINT } = process.env

async function graphql(server, options) {
  server.route({
    method: 'POST',
    url: '/graphql',
    handler: async (req, res) => {
      const lib = /^https/.test(HASURA_ENDPOINT) ? https : http
      const options = { method: 'POST' }

      const request = lib.request(HASURA_ENDPOINT, options, response => {
        let output = ''
        response.on('data', chunk => {
          output += chunk
        })
        response.on('end', () => {
          res.send(JSON.parse(output))
        })
      })

      request.on('error', err => {
        req.log.debug({ err }, `failed to perform GraphQL query`)
        res.code(500).send({ error: err.message })
      })

      request.write(JSON.stringify(req.body))
      request.end()
    }
  })
}

module.exports = fp(graphql)
