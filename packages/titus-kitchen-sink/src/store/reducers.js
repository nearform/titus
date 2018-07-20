import { combineReducers } from 'redux'
import { LOG_OUT } from './app/app-constants'

import app from './app/app-reducer'
import api from './api/api-reducer'

const appReducer = combineReducers({
  app,
  api
  // add other reducers here
})

export default (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }

  return appReducer(state, action)
}
