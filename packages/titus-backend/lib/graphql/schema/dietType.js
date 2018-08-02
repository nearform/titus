'use strict'

const dietType = `
type DietType {
  id: ID!
  name: String!
  created: Date!
  modified: Date,
  visible: Boolean!
}
`

module.exports = [dietType]
