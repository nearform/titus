'use strict'

const deleteResult = `
type DeleteResult {
    typeName: String!
    ids: [ID]!
    operation: String!
    count: Int!
  }
`
const keywordSearchResult = `
type KeywordSearchResult {
    word: String!
    score: Float
  }
`

const modifiedResult = `
type ModifiedResult {
    typeName: String!
    id: ID!
    name: String!
    operation: String!
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

module.exports = [deleteResult, modifiedResult, updateFoodResult, keywordSearchResult]
