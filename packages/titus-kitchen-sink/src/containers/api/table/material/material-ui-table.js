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

class MaterialUiTable extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    foodGroups: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired,
    selecting: PropTypes.array,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChangeBlur: PropTypes.func,
    handlePageSizeChange: PropTypes.func
  }

  state = {
    adding: false
  }

  onAddClick = () => {
    this.setState({ adding: true })
  }

  onCancelAdd = () => {
    this.setState({ adding: false })
  }

  handleDelete = () => {
    const { onDelete, rows } = this.props
    const toDelete = rows.filter(({ selected }) => selected)
    onDelete(toDelete)
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
      handleDelete,
      handleRowSelect,
      handleChangePage,
      props: {
        title,
        columns,
        rows,
        selecting,
        pageSize,
        total,
        currentPage,
        handlePageSizeChange,
        foodGroups,
        onCreate
      }
    } = this
    return (
      <Paper>
        <TableToolbar
          title={title}
          onDelete={handleDelete}
          onAddClick={this.onAddClick}
          numSelected={selecting[0] === 'all' ? total : selecting.length}
        />
        <NewFoodForm foodGroups={foodGroups} visible={this.state.adding} onCancelAdd={this.onCancelAdd} onSubmit={onCreate} />
        <Table>
          <Header
            columns={columns}
            handleRowSelect={handleRowSelect}
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
                <Row
                  key={rowKey}
                  selected={selected}
                  rowKey={rowKey}
                  row={row}
                  foodGroups={foodGroups}
                  handleRowSelect={handleRowSelect}
                  handleUpdate={this.props.onUpdate}
                />
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
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handlePageSizeChange}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default MaterialUiTable
