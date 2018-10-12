'use strict'

const resolvers = {
  Query: {
    foodHistory (root, {id}, context) {
      return context.reply.request.dbClient.food.history({foodId: id})
    }
  },
  FoodHistory: {
    foodGroup (root, args, context) {
      return context.app.dataloaders().foodGroup.getById.load(root.foodGroupId)
    }
  }
}

module.exports = resolvers
