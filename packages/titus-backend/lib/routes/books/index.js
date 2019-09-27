'use strict'

const fp = require('fastify-plugin')

async function books(server, options) {
  server.route({
    method: 'GET',
    url: '/books/:id',
    handler: async (req, res) => {
      const { id } = req.params
      try {
        const client = await server.pg.connect()
        const sql = 'SELECT * FROM books WHERE id=$1'
        const params = [id]
        const results = await client.query(sql, params)
        if (results.rows.length) {
          return res.send(results.rows[0])
        }
      } catch (err) {
        req.log.debug(
          { err },
          `failed to read DB for \`GET /books/${id}\` call`
        )
      }
      return res.code(404).send({ error: 'Could not find that book' })
    }
  })
  server.route({
    method: 'GET',
    url: '/books',
    handler: async (req, res) => {
      let results = []
      try {
        let sql = 'SELECT * FROM books'
        const params = []
        const validWhere = ['author', 'title', 'published']
        const where = []
        Object.keys(req.query).forEach((key, i) => {
          if (validWhere.indexOf(key) > -1) {
            where.push(`${key}=$${i + 1}`)
            params.push(req.query[key])
          }
        })
        if (where.length) {
          sql += ` WHERE ${where.join(' AND ')}`
        }
        const client = await server.pg.connect()
        results = (await client.query(sql, params)).rows
      } catch (err) {
        req.log.debug({ err }, 'failed to read DB for `GET /books` call')
      }
      return res.send(results)
    }
  })
}

module.exports = fp(books)
