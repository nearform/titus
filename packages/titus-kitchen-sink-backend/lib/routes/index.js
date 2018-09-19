'use strict'

const hello = require('./hello')
const error = require('./error')
const rest = require('./rest')

module.exports = (server, config) =>
  [].concat(
    hello(server, config),
    error(server, config),
    rest(server, config))
