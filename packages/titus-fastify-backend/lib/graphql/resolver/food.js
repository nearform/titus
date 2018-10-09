'use strict'
const food = require('../../model/food')

const resolvers = {
  Query: {
    food (root, args, context) {
      return food.getById(context.app.pg, args)
    },
    allFood (root, args, context) {
      return food.getAll(context.app.pg, args)
    },
    search (root, args, context) {
      return food.search(context.app.pg, args)
    },
    keywordSearch (root, args, context) {
      return food.keywordSearch(context.app.pg, args)
    }
  },
  Food: {
    foodGroup (root, args, context) {
      return context.app.dataloaders().foodGroup.getById.load(root.foodGroupId)
    }
  },
  Mutation: {
    async createFood (root, args, context) {
      return food.create(context.app.pg, args)
    },
    async updateFood (root, args, context) {
      return food.update(context.app.pg, args)
    },
    async deleteFoods (root, args, context) {
      return food.deleteFoods(context.app.pg, args)
    }
  }
}

module.exports = resolvers
