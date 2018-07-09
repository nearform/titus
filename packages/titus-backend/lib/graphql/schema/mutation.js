'use strict'

const mutation = `
type Mutation {
  createFood(food: FoodInput): Food
  updateFood(food: FoodInput): UpdateFoodResult
  deleteFoods(ids: [String]!): DeleteResult
  createFoodGroup(name: String): FoodGroup
}
`

module.exports = [mutation]
