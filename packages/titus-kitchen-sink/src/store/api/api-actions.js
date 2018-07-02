import gql from 'graphql-tag'
import * as constants from './api-constants'
import { apolloClient } from '../../app'

export const deleteFood = ids => async dispatch => {
  try {
    dispatch({type: constants.DELETE_FOOD})
    const res = await apolloClient.mutate({
      mutation: gql`
        mutation deleteFoods($ids: [String]!) {
          deleteFoods(ids: $ids) {
            ids
            count
            typeName
          }
        }
      `,
      variables: { ids }
    })
    return dispatch({
      type: constants.DELETED_FOOD,
      data: { ids, count: res.data.count }
    })
  } catch (err) {
    dispatch({
      type: constants.DELETE_FOOD_ERROR,
      data: err
    })
  }
}

export const loadFood = ids => async dispatch => {
  try {
    dispatch({type: constants.LOAD_FOOD})
    const res = await apolloClient.query({
      query: gql`
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
    `,
      variables: { ids }
    })
    const food = res.data.allFood.map(d => {
      return {
        id: d.id,
        name: d.name,
        foodGroup: d.foodGroup.name
      }
    })
    return dispatch({
      type: constants.LOADED_FOOD,
      data: { food }
    })
  } catch (err) {
    dispatch({
      type: constants.LOADING_FOOD_ERROR,
      data: err
    })
  }
}
