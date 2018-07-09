import * as constants from './api-constants'
import { apolloClient } from '../../app'
import * as queries from '../../queries'

export const deleteFood = ids => async dispatch => {
  try {
    dispatch({type: constants.DELETE_FOOD})
    const res = await apolloClient.mutate({
      mutation: queries.deleteFood,
      variables: { ids },
      update: (store, { data: { deleteFoods: { ids } } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: queries.loadAllFood })
        // Filter out the row we just deleted
        data.allFood = data.allFood.filter(({ id }) => !ids.includes(id))
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
    console.error(err)
    dispatch({
      type: constants.DELETE_FOOD_ERROR,
      data: err
    })
  }
}

export const updateFood = ({ id, name, foodGroupId }) => async dispatch => {
  try {
    dispatch({type: constants.UPDATE_FOOD})
    const res = await apolloClient.mutate({
      mutation: queries.updateFood,
      variables: { food: { id, name, foodGroupId } },
      update: (store, { data: { updateFood: { updated } } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: queries.loadAllFood })
        // Replace the row we just updated
        data.allFood = [
          ...data.allFood.filter(({ id: i }) => i !== id),
          updated
        ]
        // Write our data back to the cache.
        store.writeQuery({ query: queries.loadAllFood, data })
      }
    })
    dispatch({
      type: constants.UPDATED_FOOD,
      data: { id, count: res.data.count }
    })
    dispatch(loadFood())
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.UPDATE_FOOD_ERROR,
      data: err
    })
  }
}

export const loadFood = () => async dispatch => {
  try {
    dispatch({type: constants.LOAD_FOOD})
    const { data: { allFood } } = await apolloClient.query({
      query: queries.loadAllFood
    })
    const food = allFood
      .map(({ id, name, foodGroup: { name: foodGroup, id: foodGroupId } }) => ({ id, name, foodGroup, foodGroupId }))
    return dispatch({
      type: constants.LOADED_FOOD,
      data: { food }
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.LOADING_FOOD_ERROR,
      data: 'There was a problem loading the food data.'
    })
  }
}

export const loadFoodGroups = () => async dispatch => {
  try {
    dispatch({type: constants.LOAD_FOOD_GROUPS})
    const { data: { allFoodGroups } } = await apolloClient.query({
      query: queries.loadAllFoodGroups
    })
    return dispatch({
      type: constants.LOADED_FOOD_GROUPS,
      data: { foodGroups: allFoodGroups }
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.LOADING_FOOD_GROUPS_ERROR,
      data: 'There was a problem loading the food group data.'
    })
  }
}
