const ModelHelper = require('./model-helper')
const TransactionalModelHelper = require('./transactional-model-helper')

const foodModel = require('./food')
const dietTypeModel = require('./diet-type')
const foodGroupModel = require('./food-group')

// pg is fastify-postgres
module.exports = function dbClientFactory ({ pg }) {
  const modelHelper = ModelHelper(pg)
  // in current implementation, transactions are not really necessary, you can only use modelHelper if you want
  const transactionalModelHelper = TransactionalModelHelper(pg)

  return {
    food: {
      getAll: modelHelper(foodModel.getAll),
      getById: modelHelper(foodModel.getById),
      search: modelHelper(foodModel.search),
      keyword: modelHelper(foodModel.keyword),
      create: transactionalModelHelper(foodModel.create),
      update: transactionalModelHelper(foodModel.update),
      delete: transactionalModelHelper(foodModel.delete),
      history: modelHelper(foodModel.history)
    },
    dietType: {
      getAll: modelHelper(dietTypeModel.getAll),
      delete: transactionalModelHelper(dietTypeModel.delete),
      update: transactionalModelHelper(dietTypeModel.update)
    },
    foodGroup: {
      getById: modelHelper(foodGroupModel.getById),
      getByIds: modelHelper(foodGroupModel.getByIds),
      getAll: modelHelper(foodGroupModel.getAll),
      create: transactionalModelHelper(foodGroupModel.create)
    }
  }
}
