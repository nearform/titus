'use strict'

const mutation = `
type Mutation {
  deleteTrails(ids: [String]!): DeleteResult
}
`

module.exports = [mutation]
