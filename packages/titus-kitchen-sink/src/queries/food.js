import gql from 'graphql-tag'

export const loadFoodData = gql`
  query FoodQuery {
    foodGroups: allFoodGroups {
      id
      name
    }

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
  mutation updateFood($food: FoodInput!) {
    updateFood(food: $food) {
      __typename
      id
      typeName
      count
      operation
      updated {
        __typename
        id
        name
        foodGroup {
          __typename
          id
          name
        }
      }
    }
  }
`
export const createFood = gql`
  mutation createFood($food: FoodInput!) {
    createFood(food: $food) {
      __typename
      id
      typeName
      count
      operation
      updated {
        id
        name
        __typename
        foodGroup {
          __typename
          id
          name
        }
      }
    }
  }
`
