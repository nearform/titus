import gql from 'graphql-tag'

export const loadAllDietTypes = gql`
  query {
    allDietTypes {
      id
      name,
      visible
    }
  }
`

export const deleteDietType = gql`
  mutation deleteDietType($id: String) {
    deleteDietType (id: $id){
      id
    }
  }
`

export const toggleDietTypeVisibility = gql`
  mutation toggleDietTypeVisibility($id: String) {
    toggleDietTypeVisibility (id: $id){
      id
    }
  }
`
