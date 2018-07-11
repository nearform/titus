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

class MaterialUiTable extends Component {
  static propTypes = {
    title: PropTypes.string,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    columns: PropTypes.array,
    rows: PropTypes.array,
    foodGroups: PropTypes.array,
    handleRowSelect: PropTypes.func,
    selecting: PropTypes.array,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    currentPage: PropTypes.number,
    handlePageChangeBlur: PropTypes.func,
    handlePageSizeChange: PropTypes.func
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
        foodGroups
      }
    } = this
    return (
      <Paper>
        <TableToolbar
          title={title}
          onDelete={handleDelete}
          numSelected={selecting[0] === 'all' ? total : selecting.length}
        />
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
