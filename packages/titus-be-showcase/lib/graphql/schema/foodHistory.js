'use strict'

const foodHistory = `
type FoodHistory {
    id: ID!
    name: String!
    created: Date!
    modified: Date,
    sysPeriod: Range!,
    foodGroup: FoodGroup!
  }
`

const range = `
type Range {
  begin: Date!,
  end: Date!
}
`

module.exports = [foodHistory, range]
