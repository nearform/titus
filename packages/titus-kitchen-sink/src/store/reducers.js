import { combineReducers } from 'redux'

import app from './app/app-reducer'
import api from './api/api-reducer'

export default combineReducers({
  app,
  api
  // add other reducers here
})
