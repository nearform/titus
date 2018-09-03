import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import {loadState, saveState} from './sessionStorage'

const devtools = window.devToolsExtension || (() => (noop) => noop)

const configureStore = () => {
  const middlewares = [
    thunk
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools()
  ]

  const persistedState = loadState()

  return createStore(
    rootReducer,
    persistedState,
    compose(...enhancers)
  )
}

export const store = configureStore()

store.subscribe(() => {
  saveState(store.getState())
})
