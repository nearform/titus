import * as constants from './app-constants'

const initialState = {
  config: {}
  // Uncomment to avoid login at each refresh
  // ,
  // user: { username: 'test' }
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
      return initialState

    default:
      return state
  }
}
