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
      // authenticate the user somehow...

      let newState = {
        ...state,
        user: data
      }

      // this is just an example
      if (data.username === 'ale') {
        newState.user.avatar = 'http://www.see-v.online/alessio_small.jpg'
      }
      return newState

    // LOG_OUT is handled in ../reducers.js

    default:
      return state
  }
}
