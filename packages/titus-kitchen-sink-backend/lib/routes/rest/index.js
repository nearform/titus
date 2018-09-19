const dietType = require('./dietType')
const food = require('./food')
const foodGroup = require('./foodGroup')

module.exports = (server, config) => [
  ...dietType(server, config),
  ...food(server, config),
  ...foodGroup(server, config)
]
