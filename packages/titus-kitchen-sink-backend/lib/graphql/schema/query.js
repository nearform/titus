'use strict'

const query = `
type Query {
  food(id: ID): Food
  allFood(offset: Int, limit: Int): [Food]
  foodGroup(id: ID): FoodGroup
  allFoodGroups: [FoodGroup]
}
`

module.exports = [query]
