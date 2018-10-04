module.exports = function (server, opts, next) {
  server.get('/hello', async (request, reply) => {
    console.log('Hellow, from Fastify!')

    return 'Hellow, from Fastify!'
  })

  next()
}
