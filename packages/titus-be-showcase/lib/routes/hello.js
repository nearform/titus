'use strict'

const TrailManager = require('@nearform/trail-core').TrailsManager

const trailManager = new TrailManager()

const helloGeneric = () => ({
  method: 'GET',
  path: '/hello',
  config: {
    auth: false,
    tags: ['api'],
    plugins: {
      auth: {
        action: '*',
        resource: '*'
      }
    }
  },
  handler: async (request, h) => {
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'open',
      subject: 'hello'
    })
    return `Hello!`
  }
})

const helloRandom = () => ({
  method: 'GET',
  path: '/hello/random',
  config: {
    auth: false,
    tags: ['api'],
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: '*',
        resource: '*'
      }
    }
  },
  handler: async (request, h) => {
    const res = await request.pg.query('select * from food')
    const idx = Math.floor(Math.random() * res.rows.length)
    const name = res.rows[idx].name
    return `Hello, ${name}!`
  }
})

module.exports = (server, config) => [
  helloGeneric(server, config),
  helloRandom(server, config)
]
