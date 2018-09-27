'use strict'
const foodGroup = require('../../model/foodGroup')

const resolvers = {
  Query: {
    foodGroup (root, args, context) {
      return foodGroup.getById(context.pg, args)
    },
    allFoodGroups (root, args, context) {
      return foodGroup.getAll(context.pg)
    }
  },
  Mutation: {
    createFoodGroup (root, args, context) {
      return foodGroup.create(context.pg, args)
    }
  }
}

module.exports = resolvers
