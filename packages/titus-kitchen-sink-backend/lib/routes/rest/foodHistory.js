'use strict'

const TrailManager = require('@nearform/trail-core').TrailsManager

const foodHistory = require('../../rest/foodHistory')
const {id} = require('./schemas')

const trailManager = new TrailManager()

const subject = 'foodHistory'

const findByFoodId = () => ({
  method: 'GET',
  path: '/food/history/{id}',
  config: {
    auth: false,
    tags: ['api'],
    validate: {params: {id}},
    plugins: {
      pgPlugin: { transactional: true },
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
      what: 'getById',
      subject
    })
    return foodHistory.findByFoodId(request.pg, request.params)
  }
})

module.exports = (server, config) => [
  findByFoodId(server, config)
]
