'use strict'

const error = () => ({
  method: 'GET',
  path: '/error/{name}',
  config: { plugins: {
    'pgPlugin': { transactional: true }
  }},
  handler: async (request, h) => {
    throw new Error(request.params.name)
  }
})

module.exports = (server, config) => ([error(server, config)])
