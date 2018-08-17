import * as constants from './search-constants'
import { apolloClient } from '../../app'
import * as queries from '../../queries'

export const search = (needle, type) => async dispatch => {
  try {
    dispatch({ type: constants.SEARCH })
    const {
      data: { search }
    } = await apolloClient.query({
      query: queries.search,
      variables: { needle, type }
    })

    const items = search.map(({ id, name }) => ({
      key: id,
      value: name
    }))

    return dispatch({
      type: constants.SEARCH_COMPLETE,
      data: { items }
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.SEARCH_ERROR,
      data: 'There was an error searching.'
    })
  }
}

export const keywordSearch = (needle, type) => async dispatch => {
  try {
    dispatch({ type: constants.SEARCH_KEYWORD })
    const {
      data: { keywordSearch }
    } = await apolloClient.query({
      query: queries.keywordSearch,
      variables: { needle, type }
    })

    const items = keywordSearch.map(({ word, score }, index) => ({
      key: index,
      value: word,
      score: score
    }))

    return dispatch({
      type: constants.SEARCH_KEYWORD_COMPLETE,
      data: { items }
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: constants.SEARCH_KEYWORD_ERROR,
      data: 'There was an error searching keyword'
    })
  }
}
