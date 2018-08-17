import * as constants from './search-constants'

const initialState = {
  items: null,
  searching: false,
  error: null
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case constants.SEARCH:
      return {
        ...state,
        items: null,
        searching: true,
        error: null
      }
    case constants.SEARCH_COMPLETE:
      return {
        ...state,
        items: data.items,
        searching: false,
        error: null
      }
    case constants.SEARCH_ERROR:
      return {
        ...state,
        items: null,
        searching: false,
        error: data
      }
    case constants.SEARCH_KEYWORD:
      return {
        ...state,
        items: null,
        searching: true,
        error: null
      }
    case constants.SEARCH_KEYWORD_COMPLETE:
      return {
        ...state,
        items: data.items,
        searching: false,
        error: null
      }
    case constants.SEARCH_KEYWORD_ERROR:
      return {
        ...state,
        items: null,
        searching: false,
        error: data
      }
    default:
      return state
  }
}
