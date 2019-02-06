const dietType = require('./dietType')
const food = require('./food')
const foodHistory = require('./foodHistory')
const foodGroup = require('./foodGroup')

module.exports = (server, config) => [
  ...dietType(server, config),
  ...food(server, config),
  ...foodHistory(server, config),
  ...foodGroup(server, config)
]
