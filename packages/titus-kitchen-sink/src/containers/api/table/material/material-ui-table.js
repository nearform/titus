import React, { Fragment, Component } from 'react'
import {
  TableHeaderRow as NfTableHeaderRow,
  TableHeader as NfTableHeader
} from '@nearform/react-table'
import PropTypes from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit'
import ResetIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Check'
import TableToolbar from './table-toolbar'
import HeaderRow from './header-row'
import SortingHeaderCell from './sorting-header-cell'

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

  state = {
    rowChanges: {}
  }

  handleDelete = () => {
    const { onDelete, rows } = this.props
    const toDelete = rows.filter(({ selected }) => selected)
    onDelete(toDelete)
  }

  handleUpdate = data => () => {
    this.props.onUpdate(data)
  }

  handleEdit = (id, accessor) => e => {
    // Keep all changes in component state until saved or reverted
    this.setState({
      rowChanges: {
        ...this.state.rowChanges,
        [id]: { ...this.state.rowChanges[id], [accessor]: e.target.value }
      }
    })
  }

  cancelEdit = id => e => {
    const { [id]: value, ...rowChanges } = this.state.rowChanges
    this.setState({ rowChanges })
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

  onEditClick = rowData => () => {
    // Copy normalised data to component state, where it will be edited from
    const row = rowData.reduce((acc, curr) => {
      if (curr.accessor) {
        acc[curr.accessor] = curr.data
      }
      return acc
    }, {})
    this.setState({ rowChanges: { ...this.state.rowChanges, [row.id]: row } })
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
          <NfTableHeaderRow component={HeaderRow}>
            {[
              <NfTableHeader key='select-all'>
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    value='all'
                    onClick={handleRowSelect}
                    checked={selecting[0] === 'all'}
                  />
                </TableCell>
              </NfTableHeader>,
              ...columns.reduce((acc, curr, index) => {
                if (curr.accessor) {
                  acc.push(
                    <NfTableHeader
                      {...curr}
                      key={index}
                      component={SortingHeaderCell}
                    >
                      {curr.label}
                    </NfTableHeader>

                  )
                }
                return acc
              }, [])
            ]}
          </NfTableHeaderRow>

          <TableBody>
            {rows.map(({ rowKey, rowData, selected }, index) => {
              const row = rowData.reduce((acc, curr) => {
                if (curr.accessor) {
                  acc[curr.accessor] = curr.data
                }
                return acc
              }, {})
              const editedData = this.state.rowChanges[row.id]

              return (
                <TableRow
                  hover
                  role='checkbox'
                  aria-checked={selected}
                  tabIndex={-1}
                  key={rowKey}
                  selected={selected}
                >
                  <TableCell padding='checkbox' key={`${rowKey}-checkbox`}>
                    <Checkbox
                      color='primary'
                      value={rowKey}
                      checked={selected}
                      onClick={handleRowSelect}
                    />
                  </TableCell>
                  <TableCell padding='checkbox' key={`${rowKey}-name`}>
                    {!editedData && row.name}
                    {!!editedData && (
                      <TextField
                        fullWidth
                        defaultValue={row.name}
                        onChange={this.handleEdit(row.id, 'name')}
                      />
                    )}
                  </TableCell>
                  <TableCell padding='checkbox' key={`${rowKey}-foodGroup`}>
                    {!editedData && row.foodGroup}
                    {!!editedData && (
                      <Select
                        autoWidth
                        value={editedData.foodGroupId}
                        onChange={this.handleEdit(row.id, 'foodGroupId')}
                      >
                        {foodGroups.map(o => (
                          <MenuItem key={o.id} value={o.id}>
                            {o.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </TableCell>
                  {!this.state.rowChanges[row.id] && (
                    <Fragment>
                      <TableCell padding='checkbox'>
                        <Button onClick={this.onEditClick(rowData)}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell />
                    </Fragment>
                  )}
                  {!!this.state.rowChanges[row.id] && (
                    <Fragment>
                      <TableCell padding='checkbox'>
                        <Button onClick={this.cancelEdit(row.id)}>
                          <ResetIcon />
                        </Button>
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <Button onClick={this.handleUpdate(editedData)}>
                          <SaveIcon />
                        </Button>
                      </TableCell>
                    </Fragment>
                  )}
                </TableRow>
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
