'use strict'

const hello = require('./hello')

module.exports = (server, config) => [].concat(
  // Add routes here
  hello(server, config)
)
