'use strict'
const race = require('../model/race')

const resolvers = {
  Query: {
    race (root, args, context) {
      return race.getById(context.pg, args)
    },
    allRaces (root, args, context) {
      return race.getAll(context.pg)
    }
  },
  Mutation: {
    createRace (root, args, context) {
      return race.create(context.pg, args)
    }
  }
}

module.exports = resolvers
