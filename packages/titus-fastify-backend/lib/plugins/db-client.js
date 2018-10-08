const fastifyPlugin = require('fastify-plugin')

const modelHelperFn = require('./model-helper')

const foodModel = require('../model/food')
const dietTypeModel = require('../model/dietType')
const foodGroupModel = require('../model/foodGroup')
const foodHistoryModel = require('../model/foodHistory')

function plugin (server, options, next) {
  const { pg } = server

  const modelHelper = modelHelperFn(pg)

  const dbClient = {
    food: {
      getAll: modelHelper(foodModel.getAll),
      getById: modelHelper(foodModel.getById),
      search: modelHelper(foodModel.search),
      keyword: modelHelper(foodModel.keyword),
      create: modelHelper(foodModel.create),
      update: modelHelper(foodModel.update),
      deleteFoods: modelHelper(foodModel.deleteFoods)
    },
    dietType: {
      getAll: modelHelper(dietTypeModel.getAll),
      deleteDietType: modelHelper(dietTypeModel.deleteDietType),
      toggleDietTypeVisibility: modelHelper(dietTypeModel.toggleDietTypeVisibility)
    },
    foodGroup: {
      getById: modelHelper(foodGroupModel.getById),
      getByIds: modelHelper(foodGroupModel.getByIds),
      getAll: modelHelper(foodGroupModel.getAll),
      create: modelHelper(foodGroupModel.create)
    },
    foodHistory: {
      findByFoodId: modelHelper(foodHistoryModel.findByFoodId)
    }
  }

  server.decorateRequest('dbClient', {
    getter () {
      return dbClient
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'db-client-plugin',
  dependencies: ['fastify-postgres']
})
