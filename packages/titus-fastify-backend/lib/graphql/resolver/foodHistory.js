'use strict'
const foodHistory = require('../../model/foodHistory')

const resolvers = {
  Query: {
    foodHistory (root, args, context) {
      return foodHistory.findByFoodId(context.app.pg, args)
    }
  },
  FoodHistory: {
    foodGroup (root, args, context) {
      return context.app.dataloaders().foodGroup.getById.load(root.foodGroupId)
    }
  }
}

module.exports = resolvers
