import React from 'react'
import { TableHeaderRow, TableHeader } from 'react-nf-table'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import TableToolbar from './table-toolbar'

class HeaderRow extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <TableHead>
        <TableRow>{this.props.children}</TableRow>
      </TableHead>
    )
  }
}

class HeaderCell extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isSorting: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }

  render () {
    const { onClick, isSorting, children } = this.props

    return (
      <TableCell
        padding='checkbox'
        sortDirection={!isSorting || isSorting.asc ? 'asc' : 'desc'}
      >
        <Tooltip
          title={
            isSorting
              ? !isSorting || isSorting.asc
                ? 'Sorted Ascending'
                : 'Sorted Descending'
              : ''
          }
          enterDelay={300}
        >
          <TableSortLabel
            active={isSorting}
            direction={!isSorting || isSorting.asc ? 'asc' : 'desc'}
            onClick={onClick}
          >
            {children}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    )
  }
}

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
    this.props.onDelete(this.props.selecting)
  }

  render () {
    const {
      title,
      columns,
      rows,
      handleRowSelect,
      selecting,
      pageSize,
      total,
      currentPage,
      handlePageChangeBlur,
      handlePageSizeChange,
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
          <TableHeaderRow component={HeaderRow}>
            <HeaderCell padding='checkbox'>
              <Checkbox
                color='primary'
                onClick={e => {
                  handleRowSelect('all')
                }}
                checked={selecting[0] === 'all'}
              />
            </HeaderCell>

            {columns.map(
              ({ accessor, sortable, label }, index) =>
                accessor && (
                  <TableHeader
                    key={index}
                    sortable={sortable}
                    accessor={accessor}
                    component={HeaderCell}
                  >
                    {label}
                  </TableHeader>
                )
            )}
          </TableHeaderRow>

          <TableBody>
            {rows.map(({ rowKey, rowData, selected }, index) => (
              <TableRow
                hover
                onClick={e => {
                  handleRowSelect(rowKey)
                }}
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
                      <Checkbox color='primary' checked={selected} />
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
                onChangePage={(e, page) =>
                  this.handlePageChangeInterceptor({
                    e,
                    page,
                    handlePageChangeBlur
                  })
                }
                onChangeRowsPerPage={e => handlePageSizeChange(e)}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }

  handlePageChangeInterceptor = obj => {
    // had to proxy here because the handlePage change in nf-table takes event
    // and the event from the component has no value, so we gotta fake it
    const { e, page, handlePageChangeBlur } = obj
    if (e) {
      e.target.value = page + 1 // material ui is 0 offset so adjust for nf-table
      handlePageChangeBlur(e)
    }
  }
}

export default withStyles(tableStyles)(MaterialUiTable)
