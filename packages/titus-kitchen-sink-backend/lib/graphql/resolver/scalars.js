'use strict'

const GraphQLScalarType = require('graphql').GraphQLScalarType
const Kind = require('graphql/language').Kind

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return value
    },
    serialize (value) {
      return value
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  })
}

module.exports = resolvers
