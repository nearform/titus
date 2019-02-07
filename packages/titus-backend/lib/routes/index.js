'use strict'

const error = require('./error')

module.exports = (server, config) => [].concat(error(server, config))
