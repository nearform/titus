'use strict'

const deleteResult = `
type DeleteResult {
    typeName: String!
    ids: [ID]!
    count: Int!
  }
`

module.exports = [deleteResult]
