'use strict'

const hello = require('./hello')
const translations = require('./translations')
const error = require('./error')

module.exports = (server, config) =>
  [].concat(
    hello(server, config),
    translations(server, config),
    error(server, config)
  )
