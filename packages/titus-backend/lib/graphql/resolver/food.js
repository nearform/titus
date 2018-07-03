'use strict'
const food = require('../model/food')

const resolvers = {
  Query: {
    food (root, args, context) {
      return food.getById(context.pg, args)
    },
    allFood (root, args, context) {
      return food.getAll(context.pg, args)
    }
  },
  Food: {
    foodGroup (root, args, context) {
      return context.loaders.foodGroup.getById.load(root.foodGroupId)
    }
  },
  Mutation: {
    async createFood (root, args, context) {
      const id = await food.create(context.pg, args)
      return food.getById(context.pg, { id })
    },
    async deleteFoods (root, args, context) {
      return food.deleteFoods(context.pg, args)
    }
  }
}

module.exports = resolvers
