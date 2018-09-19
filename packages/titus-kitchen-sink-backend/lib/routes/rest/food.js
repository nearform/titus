'use strict'

const TrailManager = require('@nearform/trail-core').TrailsManager

const food = require('../../rest/food')
const {id, idList, swaggerIdList, offset, limit, keywordType, type, needle, foodWithFoodGroupId} = require('./schemas')

const trailManager = new TrailManager()

const subject = 'food'

const getAll = () => ({
  method: 'GET',
  path: '/food',
  config: {
    auth: false,
    tags: ['api'],
    validate: {
      query: {offset, limit}
    },
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
    return food.getAll(request.pg, request.query)
  }
})

const getById = () => ({
  method: 'GET',
  path: '/food/{id}',
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
    return food.getById(request.pg, request.params)
  }
})

const search = () => ({
  method: 'GET',
  path: '/food/search/{type}/{needle}',
  config: {
    auth: false,
    tags: ['api'],
    validate: {params: {needle, type}},
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
      what: 'search',
      subject
    })
    return food.search(request.pg, request.params)
  }
})

const keyword = () => ({
  method: 'GET',
  path: '/food/keyword/{keywordType}/{needle}',
  config: {
    auth: false,
    tags: ['api'],
    validate: {params: {needle, keywordType}},
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
      what: 'keyword',
      subject
    })
    return food.keyword(request.pg, request.params)
  }
})

const create = () => ({
  method: 'PUT',
  path: '/food',
  config: {
    tags: ['api'],
    validate: {payload: foodWithFoodGroupId},
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
    return food.create(request.pg, {food: request.payload})
  }
})

const update = () => ({
  method: 'POST',
  path: '/food',
  config: {
    tags: ['api'],
    validate: {payload: foodWithFoodGroupId},
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
      what: 'update',
      subject
    })
    return food.update(request.pg, {food: request.payload})
  }
})

const deleteFoods = () => ({
  method: 'DELETE',
  path: '/food/{ids}',
  config: {
    tags: ['api'],
    validate: {params: idList},
    plugins: {
      'hapi-swagger': {
        validate: {params: {ids: swaggerIdList}}
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
      what: 'delete',
      subject
    })
    return food.deleteFoods(request.pg, request.params)
  }
})

module.exports = (server, config) => [
  getAll(server, config),
  getById(server, config),
  search(server, config),
  keyword(server, config),
  create(server, config),
  update(server, config),
  deleteFoods(server, config)
]
