import * as constants from './api-constants'

const initialState = {
  food: null,
  loading: false,
  error: null
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case constants.LOAD_FOOD:
      return {
        ...state,
        loading: true
      }
    case constants.LOADED_FOOD:
      return {
        ...state,
        food: data.food,
        loading: false
      }
    case constants.LOADING_FOOD_ERROR:
      return {
        ...state,
        loading: false,
        error: data
      }
    default:
      return state
  }
}
