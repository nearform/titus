'use strict'
const trail = require('../model/trail')

const resolvers = {
  Query: {
    trails(root, args, context) {
      return trail.getAll(context.pg)
    }
  },
  Mutation: {
    deleteTrails(root, args, context) {
      return trail.deleteTrails(context.pg, args)
    }
  }
}

module.exports = resolvers
