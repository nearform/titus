import { combineReducers } from 'redux'

import app from './app/app-reducer'

const appReducer = combineReducers({
  app
  // add other reducers here
})

export default (state, action) => appReducer(state, action)
