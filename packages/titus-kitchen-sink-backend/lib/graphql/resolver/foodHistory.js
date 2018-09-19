'use strict'
const foodHistory = require('../../model/foodHistory')

const resolvers = {
  Query: {
    foodHistory (root, args, context) {
      return foodHistory.findByFoodId(context.pg, args)
    }
  },
  FoodHistory: {
    foodGroup (root, args, context) {
      return context.loaders.foodGroup.getById.load(root.foodGroupId)
    }
  }
}

module.exports = resolvers
