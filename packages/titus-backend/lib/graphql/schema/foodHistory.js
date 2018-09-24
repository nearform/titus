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

type Range {
  begin: Date!,
  end: Date!
}
`

module.exports = [foodHistory]
