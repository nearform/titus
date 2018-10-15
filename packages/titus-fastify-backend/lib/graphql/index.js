'use strict'

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = require('./schema')
const resolvers = require('./resolver')
const dataloaders = require('../dataloaders')

module.exports = {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  resolvers,
  typeDefs,
  dataloaders
}
