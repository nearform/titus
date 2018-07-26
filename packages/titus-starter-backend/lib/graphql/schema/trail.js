'use strict'

const trail = `
type Trail {
    id: ID!
    when: Date!
    whoId: String!
    whatId: String!
    subjectId: String!
    whoData: String!
    whatData: String!
    subjectData: String!
    where: String!
    why: String!
    meta: String!
  }
`

const trailInput = `
input TrailInput {
    id: ID
    when: Date!
    whoId: String!
    whatId: String!
    subjectId: String!
    whoData: String
    whatData: String
    subjectData: String
    where: String
    why: String
    meta: String
  }
`

module.exports = [trail, trailInput]
