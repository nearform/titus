'use strict'

const dietType = require('../../rest/dietType')
const { id } = require('./schemas')

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
    return dietType.getAll(request.pg)
  }
})

const deleteDietType = () => ({
  method: 'DELETE',
  path: '/diet/type/{id}',
  config: {
    tags: ['api'],
    validate: { params: { id } },
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: 'delete',
        resource: 'dietaryTypes'
      }
    }
  },
  handler: async (request, h) => {
    return dietType.deleteDietType(request.pg, request.params.id)
  }
})

const toggleDietTypeVisibility = () => ({
  method: 'POST',
  path: '/diet/type/visibility/{id}',
  config: {
    tags: ['api'],
    validate: { params: { id } },
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: 'visibility',
        resource: 'dietaryTypes'
      }
    }
  },
  handler: async (request, h) => {
    return dietType.toggleDietTypeVisibility(request.pg, request.params)
  }
})

module.exports = (server, config) => [
  getAll(server, config),
  deleteDietType(server, config),
  toggleDietTypeVisibility(server, config)
]
