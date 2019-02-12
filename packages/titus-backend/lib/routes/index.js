'use strict'

const error = require('./error')
const health = require('./rest/health')

module.exports = (server, config) =>
  [].concat(error(server, config), health(server, config))
