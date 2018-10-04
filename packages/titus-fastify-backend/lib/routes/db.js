module.exports = function (server, opts, next) {
  server.get('/db', async (request, reply) => {
    const client = await server.pg.connect()

    const { rows } = await client.query('SELECT id, name FROM users', [])

    client.release()

    return rows
  })

  next()
}
