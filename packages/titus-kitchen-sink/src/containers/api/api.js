import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Table } from 'titus-components'

const columns = [
  {
    accessor: 'name',
    label: 'Name',
    sortable: true,
    filterable: true
  },
  {
    accessor: 'foodGroup',
    label: 'Food Group',
    sortable: true,
    filterable: true
  }
]

class Api extends React.Component {
  render () {
    return (
      <Query
        query={gql`
          query {
            allFood {
              id
              name
              foodGroup {
                id
                name
              }
            }
          }
        `}
        fetchPolicy='cache-and-network'
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading.  Pretend there's a nice spinner here...</p>
          if (error) return <p>Error :(</p>
          const normalisedData = data.allFood.map(d => {
            return {
              name: d.name,
              foodGroup: d.foodGroup.name
            }
          })
          return <Table
            title='API CRUD Example'
            columns={columns}
            rows={normalisedData}
          />
        }}
      </Query>
    )
  }
}

export default Api
