'use strict'

const TrailManager = require('@nearform/trail-core').TrailsManager

const foodGroup = require('../../rest/foodGroup')
const { id, idList, swaggerIdList, foodGroupWithoutId } = require('./schemas')

const trailManager = new TrailManager()

const subject = 'foodGroup'

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
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'getAll',
      subject
    })
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
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'getById',
      subject
    })
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
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'getById',
      subject
    })
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
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'create',
      subject
    })
    return foodGroup.create(request.pg, request.payload)
  }
})

module.exports = (server, config) => [
  getAll(server, config),
  getById(server, config),
  getByIds(server, config),
  create(server, config)
]
