'use strict'

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = require('./schema')
const resolvers = require('./resolver')

module.exports = () => {
  return makeExecutableSchema({ typeDefs, resolvers })
}
