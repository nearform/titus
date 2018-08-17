import * as constants from './api-constants'
import { apolloClient } from '../../app'
import * as queries from '../../queries'

export const createFood = ({ id, name, foodGroupId }) => async dispatch => {
  try {
    dispatch({type: constants.CREATE_FOOD})
    const res = await apolloClient.mutate({
      mutation: queries.createFood,
      variables: { food: { id, name, foodGroupId } },
      update: (store, { data: { createFood: { updated } } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: queries.loadAllFood })
        // Replace the row we just updated
        data.allFood = [
          ...data.allFood,
          updated
        ]
        // Write our data back to the cache.
        store.writeQuery({ query: queries.loadAllFood, data })
      }
    })
    dispatch({
      type: constants.CREATED_FOOD,
      data: { id, count: res.data.count }
    })
    dispatch(loadFood())
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.CREATE_FOOD_ERROR,
      data: err
    })
  }
}

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

export const loadDietTypes = () => async dispatch => {
  try {
    dispatch({type: constants.LOAD_DIET_TYPES})
    const { data: { allDietTypes } } = await apolloClient.query({
      query: queries.loadAllDietTypes
    })
    return dispatch({
      type: constants.LOADED_DIET_TYPES,
      data: { dietTypes: allDietTypes }
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.LOADING_DIET_TYPES_ERROR,
      data: 'There was a problem loading the diet type data.'
    })
  }
}

export const deleteDietType = id => async dispatch => {
  try {
    dispatch({type: constants.DELETE_DIET_TYPE})
    const res = await apolloClient.mutate({
      mutation: queries.deleteDietType,
      variables: { id },
      update: (store, { data: { deleteDietType: { id } } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: queries.loadAllDietTypes })
        // Filter out the row we just deleted
        data.allDietTypes = data.allDietTypes.filter(({id: identifier}) => identifier !== id)
        // Write our data back to the cache.
        store.writeQuery({ query: queries.loadAllDietTypes, data })
      }
    })
    dispatch({
      type: constants.DELETED_DIET_TYPE,
      data: { id, count: res.data.count }
    })
    dispatch(loadDietTypes())
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.DELETE_DIET_TYPE_ERROR,
      data: err
    })
  }
}

export const toggleDietTypeVisibility = id => async dispatch => {
  try {
    dispatch({type: constants.TOGGLE_DIET_TYPE_VISIBILITY})
    const res = await apolloClient.mutate({
      mutation: queries.toggleDietTypeVisibility,
      variables: { id },
      update: (store, { data: { toggleDietTypeVisibility: { id } } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: queries.loadAllDietTypes })
        // Toggle the visibility on the item we passed in
        data.allDietTypes = data.allDietTypes.map((dietType) => {
          if (dietType.id === id) {
            return {
              ...dietType,
              visible: !dietType.visible
            }
          }

          return dietType
        })
        // Write our data back to the cache.
        store.writeQuery({ query: queries.loadAllDietTypes, data })
      }
    })
    dispatch({
      type: constants.TOGGLED_DIET_TYPE_VISIBILITY,
      data: { id, count: res.data.count }
    })
    dispatch(loadDietTypes())
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.TOGGLE_DIET_TYPE_VISIBILITY_ERROR,
      data: err
    })
  }
}
