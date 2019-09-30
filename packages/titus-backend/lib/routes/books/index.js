'use strict'

const fp = require('fastify-plugin')
const { get } = require('../../services/books')

async function books(server, options) {
  server.route({
    method: 'GET',
    url: '/books/:id',
    handler: async (req, res) => {
      const { id } = req.params
      try {
        const results = await get(id)
        if (results.length) {
          return res.send(results.rows[0])
        }
      } catch (err) {
        req.log.debug(
          { err },
          `failed to read DB for \`GET /books/${id}\` call`
        )
        return res.code(500).send({ error: err.message })
      }
      return res.code(404).send({ error: 'Could not find that book' })
    }
  })
  server.route({
    method: 'GET',
    url: '/books',
    handler: async (req, res) => {
      try {
        const results = await get()
        return res.send(results)
      } catch (err) {
        req.log.debug({ err }, 'failed to read DB for `GET /books` call')
        return res.code(500).send({ error: err.message })
      }
    }
  })
}

module.exports = fp(books)
