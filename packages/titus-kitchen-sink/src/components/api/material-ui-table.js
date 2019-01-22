import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableRow as MaterialTableRow,
  TablePagination,
  Paper
} from '@material-ui/core'
import { Header, TableToolbar, TableRow, NewFoodForm } from './'

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

  resetAdding = () => {
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

  render() {
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
      <Paper>
        <TableToolbar
          title={title}
          rows={rows}
          onAddClick={this.onAddClick}
          numSelected={selecting[0] === 'all' ? total : selecting.length}
        />

        {this.state.adding && <NewFoodForm onClose={this.resetAdding}/>}

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
                <TableRow
                  key={rowKey}
                  selected={selected}
                  rowKey={rowKey}
                  row={row}
                  handleRowSelect={this.handleRowSelect}
                />
              )
            })}
            <MaterialTableRow>
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
            </MaterialTableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default MaterialUiTable
