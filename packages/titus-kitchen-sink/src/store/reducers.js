import { combineReducers } from 'redux'

import app from './app/app-reducer'
import search from './search/search-reducer'

const appReducer = combineReducers({
  app,
  search
  // add other reducers here
})

export default (state, action) => appReducer(state, action)
