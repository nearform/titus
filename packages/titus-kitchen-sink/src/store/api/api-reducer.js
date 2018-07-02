import * as constants from './api-constants'

const initialState = {
  food: null,
  loading: false
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case constants.DELETE_FOOD:
      return {
        ...state
      }
    case constants.DELETED_FOOD:
      return {
        ...state,
        food: state.food.filter(f => data.ids.indexOf(f.id) === -1)
      }
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
    default:
      return state
  }
}
