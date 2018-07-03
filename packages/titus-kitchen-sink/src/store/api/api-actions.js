import * as constants from './api-constants'
import { apolloClient } from '../../app'
import * as queries from '../../queries/food'

export const deleteFood = ids => async dispatch => {
  try {
    dispatch({type: constants.DELETE_FOOD})
    const res = await apolloClient.mutate({
      mutation: queries.deleteFood,
      variables: { ids },
      update: (store, { data: { deleteFoods: { ids } } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: queries.loadAllFood })
        // Add our comment from the mutation to the end.
        data.allFood = data.allFood.filter(f => ids.indexOf(f.id) === -1)
        // Write our data back to the cache.
        store.writeQuery({ query: queries.loadAllFood, data })
      }
    })
    dispatch({
      type: constants.DELETED_FOOD,
      data: { ids, count: res.data.count }
    })
    dispatch(loadFood())
  } catch (err) {
    dispatch({
      type: constants.DELETE_FOOD_ERROR,
      data: err
    })
  }
}

export const loadFood = () => async dispatch => {
  try {
    dispatch({type: constants.LOAD_FOOD})
    const res = await apolloClient.query({
      query: queries.loadAllFood
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
    console.error(err)
    dispatch({
      type: constants.LOADING_FOOD_ERROR,
      data: 'There was a problem loading the data.'
    })
  }
}
