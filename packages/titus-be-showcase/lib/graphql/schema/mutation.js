'use strict'

const mutation = `
type Mutation {
  createFood(food: FoodInput): UpdateFoodResult
  updateFood(food: FoodInput): UpdateFoodResult
  deleteFoods(ids: [String]!): DeleteResult
  createFoodGroup(name: String): FoodGroup
  deleteDietType(id: String): ModifiedResult
  toggleDietTypeVisibility(id: String): ModifiedResult
}
`

module.exports = [mutation]
