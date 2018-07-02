import React from 'react'
import {
  TableHeaderRow as NfTableHeaderRow,
  TableHeader as NfTableHeader
} from '@nearform/react-table'
import PropTypes from 'prop-types'
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

class MaterialUiTable extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onDelete: PropTypes.func,
    columns: PropTypes.array,
    rows: PropTypes.array,
    handleRowSelect: PropTypes.func,
    selecting: PropTypes.array,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    currentPage: PropTypes.number,
    handlePageChangeBlur: PropTypes.func,
    handlePageSizeChange: PropTypes.func,
    handleDeleteRow: PropTypes.func
  }

  handleDelete = () => {
    const { onDelete, rows, handleDeleteRow } = this.props
    const toDelete = rows.filter(({ selected }) => selected)
    onDelete(toDelete)
    for (var row of toDelete) {
      handleDeleteRow(row.rowKey)
    }
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
        handlePageSizeChange
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
          <NfTableHeaderRow component={HeaderRow}>
            {[<NfTableHeader key='select-all'>
              <TableCell padding='checkbox'>
                <Checkbox
                  color='primary'
                  value='all'
                  onClick={handleRowSelect}
                  checked={selecting[0] === 'all'}
                />
              </TableCell>
            </NfTableHeader>,
            ...columns.reduce(
              (acc, curr, index) => {
                const { accessor, sortable, label, hidden } = curr
                if (accessor) {
                  acc.push(
                    <NfTableHeader
                      key={index}
                      sortable={sortable}
                      accessor={accessor}
                      component={SortingHeaderCell}>{label}
                      hidden={hidden}
                    </NfTableHeader>
                  )
                }
                return acc
              }, [])
            ]}

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
                {rowData.map(({ accessor, data, key }) => {
                  if (accessor && !!columns.find(x => x.accessor === accessor).hidden) {
                    return
                  }
                  return <TableCell padding='checkbox' key={key}>
                    {accessor ? (
                      data
                    ) : (
                      <Checkbox
                        color='primary'
                        value={rowKey}
                        checked={selected}
                        onClick={handleRowSelect}
                      />
                    )}
                  </TableCell>
                })}
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
