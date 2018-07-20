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
      operation
    }
  }
`

export const updateFood = gql`
mutation updateFood ($food: FoodInput!) {
  updateFood (food: $food){
    id
    typeName
    count
    operation
    updated {
      id
      name
      foodGroup {
        id
        name
      }
    }
  }
}
`
export const createFood = gql`
mutation createFood ($food: FoodInput!) {
  createFood (food: $food){
    id
    typeName
    count
    operation
    updated {
      id
      name
      foodGroup {
        id
        name
      }
    }
  }
}
`
