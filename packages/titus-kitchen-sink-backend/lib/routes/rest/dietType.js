'use strict'

const TrailManager = require('@nearform/trail-core').TrailsManager

const dietType = require('../../rest/dietType')
const {id} = require('./schemas')

const trailManager = new TrailManager()

const subject = 'dietType'

const getAll = () => ({
  method: 'GET',
  path: '/diet/type',
  config: {
    tags: ['api'],
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: 'read',
        resource: 'dietaryTypes'
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
    return dietType.getAll(request.pg)
  }
})

const deleteDietType = () => ({
  method: 'DELETE',
  path: '/diet/type/{id}',
  config: {
    tags: ['api'],
    validate: {params: {id}},
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: 'delete',
        resource: 'dietaryTypes'
      }
    }
  },
  handler: async (request, h) => {
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'deleteDietType',
      subject
    })
    return dietType.deleteDietType(request.pg, request.params.id)
  }
})

const toggleDietTypeVisibility = () => ({
  method: 'POST',
  path: '/diet/type/visibility/{id}',
  config: {
    tags: ['api'],
    validate: {params: {id}},
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: 'visibility',
        resource: 'dietaryTypes'
      }
    }
  },
  handler: async (request, h) => {
    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'toggleDietTypeVisibility',
      subject
    })
    return dietType.toggleDietTypeVisibility(request.pg, request.params)
  }
})

module.exports = (server, config) => [
  getAll(server, config),
  deleteDietType(server, config),
  toggleDietTypeVisibility(server, config)
]
