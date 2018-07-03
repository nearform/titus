import gql from 'graphql-tag'

export const loadAllFood = gql`
  query {
    allFood {
      id
      name
      foodGroup {
        id
        name
      }
    }
  }
`

export const deleteFood = gql`
  mutation deleteFoods($ids: [String]!) {
    deleteFoods(ids: $ids) {
      ids
      count
      typeName
    }
  }
`
