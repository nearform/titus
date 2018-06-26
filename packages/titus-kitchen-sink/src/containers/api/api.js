import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeaderRow, TableHeader } from 'react-nf-table'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const cols = [
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

const thEl = ({ children, onClick }) => {
  return <th onClick={onClick}>{children}</th>
}
thEl.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
}

class Api extends React.Component {
  renderTable ({
    rows,
    columns,
    handleNextPage,
    handlePrevPage,
    hasPrevPage,
    hasNextPage
  }) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <TableHeaderRow>
                {columns.map(
                  ({ accessor, sortable, filterable, label }, index) => {
                    return (
                      <TableHeader
                        key={index}
                        accessor={accessor}
                        sortable={sortable}
                        filterable={filterable}
                        component={thEl}
                      >
                        {label}
                      </TableHeader>
                    )
                  }
                )}
              </TableHeaderRow>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ rowKey, rowData }) => {
              return (
                <tr key={rowKey}>
                  {rowData.map(({ data, key }) => <td key={key}>{data}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
        <span>
          {/* {hasPrevPage && <button onClick={handlePrevPage}>Prev</button>} */}
          {/* {hasNextPage && <button onClick={handleNextPage}>Next</button>} */}
        </span>
      </div>
    )
  }

  render () {
    return (
      <Query
        query={gql`
          query($limit: Int, $offset: Int) {
            allFood(limit: $limit, offset: $offset) {
              id
              name
              foodGroup {
                id
                name
              }
            }
          }
        `}
        variables={{
          offset: 0,
          limit: 20
        }}
        // fetchPolicy='no-cache'
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          if (!data.allFood) {
            return <p>Data: {JSON.stringify(data)}</p>
          }
          const normalisedData = data.allFood.map(d => {
            return {
              name: d.name,
              foodGroup: d.foodGroup.name
            }
          })

          return (
            <Table
              pageSize={20}
              data={normalisedData}
              render={tableProps => {
                const { currentPage, pageSize } = tableProps
                const handleNextPage = e => {
                  fetchMore({
                    variables: {
                      offset: (currentPage - 1) * pageSize
                    },
                    updateQuery: (prev, { fetchPrevResult }) => {
                      if (!fetchPrevResult) return prev
                      return Object.assign({}, prev, {
                        allFood: [...prev.allFood, ...fetchPrevResult.allFood]
                      })
                    }
                  })
                  tableProps.handleNextPage(e)
                }
                const handlePrevPage = e => {
                  fetchMore({
                    variables: {
                      offset: (currentPage - 1) * pageSize
                    },
                    updateQuery: (prev, { fetchPrevResult }) => {
                      if (!fetchPrevResult) return prev
                      return Object.assign({}, prev, {
                        allFood: [...prev.allFood, ...fetchPrevResult.allFood]
                      })
                    }
                  })
                  tableProps.handlePrevPage(e)
                }
                return this.renderTable({
                  ...tableProps,
                  handleNextPage,
                  handlePrevPage
                })
              }}
              columns={cols}
            />
          )
        }}
        {/* {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          // return <Table
          // pageSize={3}
          // data={data}
          // render={this.renderTable}
          // columns={cols}
          // />
        }}} */}
      </Query>
    )
  }
}

export default Api
