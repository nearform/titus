'use strict'

const fp = require('fastify-plugin')
const request = require('request')
const { HASURA_ENDPOINT } = process.env

async function graphql(server, options) {
  server.route({
    method: 'POST',
    url: '/graphql',
    handler: (req, res) => {
      const options = {
        url: HASURA_ENDPOINT,
        body: req.body,
        json: true
      }
      request.post(options, (err, httpResponse, response) => {
        if (err) {
          req.log.debug({ err }, `failed to perform GraphQL query`)
          return res.code(500).send({ error: err.message })
        }
        return res.send(response)
      })
    }
  })
}

module.exports = fp(graphql)
