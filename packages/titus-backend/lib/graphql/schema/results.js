'use strict'

const deleteResult = `
type DeleteResult {
    typeName: String!
    ids: [ID]!
    operation: String!
    count: Int!
  }
`

const updateFoodResult = `
type UpdateFoodResult {
    typeName: String!
    id: ID!
    operation: String!
    count: Int!
    updated: Food
  }
`

module.exports = [deleteResult, updateFoodResult]
