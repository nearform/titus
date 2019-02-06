'use strict'

const foodGroup = require('../../rest/foodGroup')
const { id, idList, swaggerIdList, foodGroupWithoutId } = require('./schemas')

const getAll = () => ({
  method: 'GET',
  path: '/foodgroup',
  config: {
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
    return foodGroup.getAll(request.pg)
  }
})

const getById = () => ({
  method: 'GET',
  path: '/foodgroup/{id}',
  config: {
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
    return foodGroup.getById(request.pg, request.params)
  }
})

const getByIds = () => ({
  method: 'GET',
  path: '/foodgroup/list/{ids}',
  config: {
    tags: ['api'],
    validate: { params: idList },
    plugins: {
      'hapi-swagger': {
        validate: { params: { ids: swaggerIdList } }
      },
      pgPlugin: { transactional: true },
      auth: {
        action: '*',
        resource: '*'
      }
    }
  },
  handler: async (request, h) => {
    return foodGroup.getByIds(request.pg, request.params.ids)
  }
})

const create = () => ({
  method: 'PUT',
  path: '/foodgroup',
  config: {
    tags: ['api'],
    validate: { payload: foodGroupWithoutId },
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: '*',
        resource: '*'
      }
    }
  },
  handler: async (request, h) => {
    return foodGroup.create(request.pg, request.payload)
  }
})

module.exports = (server, config) => [
  getAll(server, config),
  getById(server, config),
  getByIds(server, config),
  create(server, config)
]
