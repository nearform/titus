'use strict'

const helloGeneric = () => ({
  method: 'GET',
  path: '/hello',
  handler: async (request, h) => {
    return `Hello!`
  }
})

const helloRandom = () => ({
  method: 'GET',
  path: '/hello/random',
  config: { plugins: {
    'pgPlugin': { transactional: true }
  }},
  handler: async (request, h) => {
    const res = await request.pg.query('select * from person')
    const idx = Math.floor(Math.random() * res.rows.length)
    const name = res.rows[idx].first_name
    return `Hello, ${name}!`
  }
})

module.exports = (server, config) => (
  [helloGeneric(server, config), helloRandom(server, config)]
)
