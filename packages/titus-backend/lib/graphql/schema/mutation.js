'use strict'

const mutation = `
type Mutation {
  createFood(food: FoodInput): Food
  deleteFoods(ids: [String]!): DeleteResult
  createFoodGroup(name: String): FoodGroup
}
`

module.exports = [mutation]
