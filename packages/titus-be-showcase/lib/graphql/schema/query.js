'use strict'

const query = `
type Query {
  food(id: ID): Food
  foodHistory(id: ID!): [FoodHistory]
  search(needle: String, type: String): [Food]
  keywordSearch(needle: String, type: String): [KeywordSearchResult]
  allFood(offset: Int, limit: Int): [Food]
  foodGroup(id: ID): FoodGroup
  allFoodGroups: [FoodGroup]
  allDietTypes: [DietType]
}
`

module.exports = [query]
