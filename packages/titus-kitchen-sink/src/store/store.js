import { compose, createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

const devtools = window.devToolsExtension || (() => noop => noop)

const configureStore = () => {
  const middlewares = []

  const enhancers = [applyMiddleware(...middlewares), devtools()]

  return createStore(rootReducer, compose(...enhancers))
}

export const store = configureStore()
