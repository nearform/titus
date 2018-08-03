'use strict'

const deleteResult = `
type DeleteResult {
    typeName: String!
    ids: [ID]!
    operation: String!
    count: Int!
  }
`

module.exports = [deleteResult]
