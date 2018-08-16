import { combineReducers } from 'redux'

import app from './app/app-reducer'
import api from './api/api-reducer'
import search from './search/search-reducer'

const appReducer = combineReducers({
  app,
  api,
  search
  // add other reducers here
})

export default (state, action) => appReducer(state, action)
