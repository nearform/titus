import { combineReducers } from 'redux'
import { LOG_OUT } from './app/app-constants'

import app from './app/app-reducer'

const appReducer = combineReducers({
  app
  // add other reducers here
})

export default (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }

  return appReducer(state, action)
}
