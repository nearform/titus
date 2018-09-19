'use strict'
const food = require('../../model/food')

const resolvers = {
  Query: {
    food (root, args, context) {
      return food.getById(context.pg, args)
    },
    allFood (root, args, context) {
      return food.getAll(context.pg, args)
    },
    search (root, args, context) {
      return food.search(context.pg, args)
    },
    keywordSearch (root, args, context) {
      return food.keywordSearch(context.pg, args)
    }
  },
  Food: {
    foodGroup (root, args, context) {
      return context.loaders.foodGroup.getById.load(root.foodGroupId)
    }
  },
  Mutation: {
    async createFood (root, args, context) {
      return food.create(context.pg, args)
    },
    async updateFood (root, args, context) {
      return food.update(context.pg, args)
    },
    async deleteFoods (root, args, context) {
      return food.deleteFoods(context.pg, args)
    }
  }
}

module.exports = resolvers
