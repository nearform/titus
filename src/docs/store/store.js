import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const devtools = window.devToolsExtension || (() => (noop) => noop)

export const configureStore = () => {
  const middlewares = [
    thunk
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools()
  ]

  return createStore(rootReducer, compose(...enhancers))
}

export const store = configureStore()
