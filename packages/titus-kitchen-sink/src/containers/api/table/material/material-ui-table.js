import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import TableToolbar from './table-toolbar'
import Header from './header'
import Row from './table-row'
import NewFoodForm from './new-food-form'
import { Mutation, Query } from 'react-apollo'
import {
  createFood,
  updateFood,
  loadFoodData,
  deleteFood
} from '../../../../queries'

class MaterialUiTable extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired,
    selecting: PropTypes.array,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChangeBlur: PropTypes.func,
    handlePageSizeChange: PropTypes.func
  }

  state = {
    adding: false,
    selected: []
  }

  onAddClick = () => {
    this.setState({ adding: true })
  }

  onCancelAdd = () => {
    this.setState({ adding: false })
  }

  handleRowSelect = event => {
    this.props.handleRowSelect(event.target.value)
  }

  handleChangePage = (event, page) => {
    if (event) {
      event.target.value = page + 1 // material ui is 0 offset so adjust for nf-table
      this.props.handlePageChangeBlur(event)
    }
  }

  render () {
    const {
      title,
      columns,
      rows,
      selecting,
      pageSize,
      total,
      currentPage,
      handlePageSizeChange
    } = this.props

    return (
      <Query query={loadFoodData}>
        {({ data: { foodGroups }, loading }) => {
          return !loading ? (
            <Paper>
              <Mutation
                mutation={deleteFood}
                update={(cache, { data: { deleteFoods } }) => {
                  const { ids } = deleteFoods
                  const data = cache.readQuery({ query: loadFoodData })

                  data.allFood = data.allFood.filter(
                    ({ id }) => !ids.includes(id)
                  )
                  cache.writeQuery({ query: loadFoodData, data })
                }}
              >
                {deleteFood => (
                  <TableToolbar
                    title={title}
                    onDelete={e => {
                      const ids = rows
                        .filter(({ selected }) => selected)
                        .map(
                          row => row.rowData.find(r => r.accessor === 'id').data
                        )

                      deleteFood({
                        variables: { ids },
                        optimisticResponse: {
                          __typename: 'Mutation',
                          deleteFoods: {
                            __typename: 'DeleteResult',
                            ids,
                            typeName: 'Food',
                            count: ids.length,
                            operation: 'delete'
                          }
                        }
                      })
                    }}
                    onAddClick={this.onAddClick}
                    numSelected={
                      selecting[0] === 'all' ? total : selecting.length
                    }
                  />
                )}
              </Mutation>
              <Mutation
                mutation={createFood}
                update={(cache, { data: { createFood } }) => {
                  const { updated } = createFood
                  const data = cache.readQuery({ query: loadFoodData })

                  data.allFood = [...data.allFood, updated]
                  cache.writeQuery({ query: loadFoodData, data })
                }}
              >
                {createFood => (
                  <NewFoodForm
                    foodGroups={foodGroups}
                    visible={this.state.adding}
                    onCancelAdd={this.onCancelAdd}
                    onSubmit={food => {
                      food.foodGroup = foodGroups.find(
                        ({ id }) => id === food.foodGroupId
                      ).name

                      const id = new Date().getTime()

                      this.setState({ adding: false }, () =>
                        createFood({
                          variables: { food },
                          optimisticResponse: {
                            __typename: 'Mutation',
                            createFood: {
                              __typename: 'UpdateFoodResult',
                              id,
                              typeName: 'Food',
                              count: 1,
                              operation: 'create',
                              updated: {
                                __typename: 'Food',
                                id,
                                name: food.name,
                                foodGroup: {
                                  __typename: 'FoodGroup',
                                  id: food.foodGroupId,
                                  name: food.foodGroup
                                }
                              }
                            }
                          }
                        }).catch(error => {
                          console.log('error fetching', error)
                        })
                      )
                    }}
                  />
                )}
              </Mutation>

              <Table>
                <Header
                  columns={columns}
                  handleRowSelect={this.handleRowSelect}
                  selecting={selecting}
                />
                <TableBody>
                  {rows.map(({ rowKey, rowData, selected }) => {
                    const row = rowData.reduce((acc, curr) => {
                      if (curr.accessor) {
                        acc[curr.accessor] = curr.data
                      }
                      return acc
                    }, {})

                    return (
                      <Mutation mutation={updateFood} key={rowKey}>
                        {updateFood => (
                          <Row
                            selected={selected}
                            rowKey={rowKey}
                            row={row}
                            foodGroups={foodGroups}
                            handleRowSelect={this.handleRowSelect}
                            handleUpdate={food =>
                              updateFood({
                                variables: { food },
                                optimisticResponse: {
                                  __typename: 'Mutation',
                                  updateFood: {
                                    __typename: 'UpdateFoodResult',
                                    id: food.id,
                                    typeName: 'Food',
                                    count: 1,
                                    operation: 'update',
                                    updated: {
                                      __typename: 'Food',
                                      id: food.id,
                                      name: food.name,
                                      foodGroup: {
                                        __typename: 'FoodGroup',
                                        id: food.foodGroupId,
                                        name: food.foodGroup
                                      }
                                    }
                                  }
                                }
                              })
                            }
                          />
                        )}
                      </Mutation>
                    )
                  })}
                  <TableRow>
                    <TablePagination
                      count={total}
                      rowsPerPage={pageSize}
                      page={currentPage - 1}
                      backIconButtonProps={{
                        'aria-label': 'Previous Page'
                      }}
                      nextIconButtonProps={{
                        'aria-label': 'Next Page'
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={handlePageSizeChange}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          ) : null
        }}
      </Query>
    )
  }
}

export default MaterialUiTable
