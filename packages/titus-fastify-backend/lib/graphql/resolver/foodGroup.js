'use strict'

const resolvers = {
  Query: {
    foodGroup (root, args, context) {
      return context.reply.request.dbClient.foodGroup.getById(args)
    },
    allFoodGroups (root, args, context) {
      return context.reply.request.dbClient.foodGroup.getAll()
    }
  },
  Mutation: {
    createFoodGroup (root, args, context) {
      return context.reply.request.dbClient.foodGroup.create(args)
    }
  }
}

module.exports = resolvers
