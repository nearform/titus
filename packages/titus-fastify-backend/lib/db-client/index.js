const ModelHelper = require('./model-helper')

const foodModel = require('./food/food')
const dietTypeModel = require('../model/dietType')
const foodGroupModel = require('../model/foodGroup')
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
}
