import gql from 'graphql-tag'

export const recordSearch = gql`
  query recordSearch($needle: String!, $type: String) {
    search(needle: $needle, type: $type) {
      id
      name
    }
  }
`

export const keywordSearch = gql`
  query keywordSearch($needle: String!, $type: String) {
    keywordSearch(needle: $needle, type: $type) {
      word
      score
    }
  }
`
