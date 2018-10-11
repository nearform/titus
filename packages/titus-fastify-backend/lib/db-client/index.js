const ModelHelper = require('./model-helper')

const foodModel = require('./food')
const dietTypeModel = require('./diet-type')
const foodGroupModel = require('./food-group')
const foodHistoryModel = require('../model/foodHistory')

module.exports = function dbClientFactory ({ pg }) {
  const modelHelper = ModelHelper(pg)

  return {
    food: {
      getAll: modelHelper(foodModel.getAll),
      getById: modelHelper(foodModel.getById),
      search: modelHelper(foodModel.search),
      keyword: modelHelper(foodModel.keyword),
      create: modelHelper(foodModel.create),
      update: modelHelper(foodModel.update),
      delete: modelHelper(foodModel.delete)
    },
    dietType: {
      getAll: modelHelper(dietTypeModel.getAll),
      delete: modelHelper(dietTypeModel.delete),
      update: modelHelper(dietTypeModel.update)
    },
    foodGroup: {
      getById: modelHelper(foodGroupModel.getById),
      getAll: modelHelper(foodGroupModel.getAll),
      create: modelHelper(foodGroupModel.create)
    },
    foodHistory: {
      findByFoodId: modelHelper(foodHistoryModel.findByFoodId)
    }
  }
}
