import { loader } from 'graphql.macro'

export const createFood = loader('../queries/createFood.graphql')
export const loadFoodData = loader('../queries/loadFoodData.graphql')
export const updateFood = loader('../queries/updateFood.graphql')
export const deleteFood = loader('../queries/deleteFood.graphql')
