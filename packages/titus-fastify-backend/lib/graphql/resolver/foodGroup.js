'use strict'
const foodGroup = require('../../model/foodGroup')

const resolvers = {
  Query: {
    foodGroup (root, args, context) {
      return foodGroup.getById(context.app.pg, args)
    },
    allFoodGroups (root, args, context) {
      return foodGroup.getAll(context.app.pg)
    }
  },
  Mutation: {
    createFoodGroup (root, args, context) {
      return foodGroup.create(context.app.pg, args)
    }
  }
}

module.exports = resolvers
