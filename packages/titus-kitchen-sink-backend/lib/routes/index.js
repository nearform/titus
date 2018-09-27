'use strict'

const hello = require('./hello')
const translations = require('./translations')
const error = require('./error')
const rest = require('./rest')

module.exports = (server, config) =>
  [].concat(
    hello(server, config),
    error(server, config),
    translations(server, config),
    rest(server, config)
  )
