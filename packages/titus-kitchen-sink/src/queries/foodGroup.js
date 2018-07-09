import gql from 'graphql-tag'

export const loadAllFoodGroups = gql`
  query {
    allFoodGroups {
      id
      name
    }
  }
`
