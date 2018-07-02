'use strict'

const hello = require('./hello')
const error = require('./error')

module.exports = (server, config) => [
  ...hello(server, config),
  ...error(server, config)
]
