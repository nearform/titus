'use strict'

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = require('./schema')
const resolvers = require('./resolver')
const loaders = require('./model').loaders

module.exports = {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  loaders
}
