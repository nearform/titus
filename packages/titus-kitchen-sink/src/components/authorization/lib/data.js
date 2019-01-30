import { loader } from 'graphql.macro'

export const loadAllDietTypes = loader('../queries/loadAllDietTypes.graphql')
export const deleteDietType = loader('../queries/deleteDietType.graphql')
export const toggleDietTypeVisibility = loader(
  '../queries/toggleDietTypeVisibility.graphql'
)
