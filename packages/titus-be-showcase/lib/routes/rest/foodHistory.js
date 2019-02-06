'use strict'

const foodHistory = require('../../rest/foodHistory')
const { id } = require('./schemas')

const findByFoodId = () => ({
  method: 'GET',
  path: '/food/history/{id}',
  config: {
    auth: false,
    tags: ['api'],
    validate: { params: { id } },
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: '*',
        resource: '*'
      }
    }
  },
  handler: async (request, h) => {
    return foodHistory.findByFoodId(request.pg, request.params)
  }
})

module.exports = (server, config) => [findByFoodId(server, config)]
