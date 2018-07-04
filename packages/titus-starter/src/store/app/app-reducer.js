import * as constants from './app-constants'

const initialState = {
  config: {}
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case constants.UPDATE_APP_CONFIG:
      return {
        ...state,
        config: {
          ...state.config,
          ...data
        }
      }

    case constants.LOG_IN:
      return {
        ...state,
        user: data
      }

    case constants.LOG_OUT:
      // LOG_OUT is handled in ../reducers.js
      break

    default:
      return state
  }
}
