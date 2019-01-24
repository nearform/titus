import { loader } from 'graphql.macro'

export const loadFoodHistoryData = loader('../queries/loadFoodHistoryData.graphql')
export const loadFoodData = loader('../../api/queries/loadFoodData.graphql')
