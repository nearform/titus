const config = require('../../config/default')

module.exports = [
  // logging first because other plugins may use it
  {
    plugin: require('./logger'),
    options: config
  },
  // then authentication because it declares default strategy for incoming routes
  {
    plugin: require('./auth0'),
    options: config.auth0
  },
  {
    plugin: require('./pg'),
    options: config.pg
  }
]
