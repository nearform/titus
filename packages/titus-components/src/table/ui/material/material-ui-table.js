import React from 'react'
import {
  TableHeaderRow as NfTableHeaderRow,
  TableHeader as NfTableHeader
} from 'react-nf-table'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import TableToolbar from './table-toolbar'
import HeaderRow from './header-row'
import SortingHeaderCell from './sorting-header-cell'

const tableStyles = theme => ({
  root: {}
})
class MaterialUiTable extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    classes: PropTypes.object,
    onDelete: PropTypes.func,
    columns: PropTypes.array,
    rows: PropTypes.array,
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
    onDelete(
      rows.filter(row => {
        return row.selected
      })
    )
  }

  handleRowSelect = e => {
    this.props.handleRowSelect(e.target.value)
  }

  handleChangePage = (e, page) => {
    if (e) {
      e.target.value = page + 1 // material ui is 0 offset so adjust for nf-table
      this.props.handlePageChangeBlur(e)
    }
  }

  handleChangeRowsPerPage = e => {
    this.props.handlePageSizeChange(e)
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
      classes
    } = this.props

    return (
      <Paper className={classes.root}>
        <TableToolbar
          title={title}
          onDelete={this.handleDelete}
          numSelected={selecting[0] === 'all' ? rows.length : selecting.length}
        />
        <Table>
          <NfTableHeaderRow component={HeaderRow}>
            <NfTableHeader>
              <TableCell padding='checkbox'>
                <Checkbox
                  color='primary'
                  value='all'
                  onClick={this.handleRowSelect}
                  checked={selecting[0] === 'all'}
                />
              </TableCell>
            </NfTableHeader>

            {columns.map(
              ({ accessor, sortable, label }, index) =>
                accessor && (
                  <NfTableHeader
                    key={index}
                    sortable={sortable}
                    accessor={accessor}
                    component={SortingHeaderCell}
                  >
                    {label}
                  </NfTableHeader>
                )
            )}
          </NfTableHeaderRow>

          <TableBody>
            {rows.map(({ rowKey, rowData, selected }, index) => (
              <TableRow
                hover
                role='checkbox'
                aria-checked={selected}
                tabIndex={-1}
                key={rowKey}
                selected={selected}
              >
                {rowData.map(({ accessor, data, key }) => (
                  <TableCell padding='checkbox' key={key}>
                    {accessor ? (
                      data
                    ) : (
                      <Checkbox
                        color='primary'
                        value={rowKey}
                        checked={selected}
                        onClick={this.handleRowSelect}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
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
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(tableStyles)(MaterialUiTable)
