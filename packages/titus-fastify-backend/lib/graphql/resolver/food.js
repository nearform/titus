'use strict'

const resolvers = {
  Query: {
    food (root, args, context) {
      return context.reply.request.dbClient.food.getById(args)
    },
    allFood (root, args, context) {
      return context.reply.request.dbClient.food.getAll(args)
    },
    search (root, args, context) {
      return context.reply.request.dbClient.food.search(args)
    },
    keywordSearch (root, args, context) {
      return context.reply.request.dbClient.food.keywordSearch(args)
    }
  },
  Food: {
    foodGroup (root, args, context) {
      return context.app.dataloaders(context.reply.request.dbClient).foodGroup.getByIds.load(root.foodGroupId)
    }
  },
  Mutation: {
    async createFood (root, args, context) {
      return context.reply.request.dbClient.food.create(args)
    },
    async updateFood (root, args, context) {
      return context.reply.request.dbClient.food.update(args)
    },
    async deleteFoods (root, args, context) {
      return context.reply.request.dbClient.food.delete(args)
    }
  }
}

module.exports = resolvers
