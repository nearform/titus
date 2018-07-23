import { combineReducers } from 'redux'

import app from './app/app-reducer'
import api from './api/api-reducer'

const appReducer = combineReducers({
  app,
  api
  // add other reducers here
})

export default (state, action) => appReducer(state, action)
