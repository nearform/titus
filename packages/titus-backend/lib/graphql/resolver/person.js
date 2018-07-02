'use strict'
const person = require('../model/person')
const race = require('../model/race')

const resolvers = {
  Query: {
    person (root, args, context) {
      return person.getById(context.pg, args)
    },
    allPeople (root, args, context) {
      return person.getAll(context.pg)
    }
  },
  Person: {
    race (root, args, context) {
      return race.getById(context.pg, { id: root.raceId })
    }
  },
  Mutation: {
    async createPerson (root, args, context) {
      const id = await person.create(context.pg, args)
      return person.getById(context.pg, { id })
    }
  }
}

module.exports = resolvers
