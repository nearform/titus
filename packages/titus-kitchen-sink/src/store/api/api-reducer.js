import * as constants from './api-constants'

const initialState = {
  food: null,
  foodGroups: null,
  loadingFood: false,
  loadingFoodGroups: false,
  error: null
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case constants.LOAD_FOOD:
      return {
        ...state,
        loadingFood: true
      }
    case constants.LOADED_FOOD:
      return {
        ...state,
        food: data.food,
        loadingFood: false
      }
    case constants.LOADING_FOOD_ERROR:
      return {
        ...state,
        loadingFood: false,
        error: data
      }
    case constants.LOAD_FOOD_GROUPS:
      return {
        ...state,
        loadingFoodGroups: true
      }
    case constants.LOADED_FOOD_GROUPS:
      return {
        ...state,
        foodGroups: data.foodGroups,
        loadingFoodGroups: false
      }
    case constants.LOADING_FOOD_GROUPS_ERROR:
      return {
        ...state,
        loadingFoodGroups: false,
        error: data
      }
    default:
      return state
  }
}
