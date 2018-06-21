import React from 'react'
import { TableHeaderRow, TableHeader } from 'react-nf-table'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'

const HeaderCell = ({ onClick, isSorting, children }) => (
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

HeaderCell.propTypes = {
  onClick: PropTypes.func,
  isSorting: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85)
  },
  spacer: {
    flex: '1 1 100%'
  },
  title: {
    flex: '0 0 auto'
  },
  rightControls: {
    flex: '0 0 auto'
  },
  rightItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexEnd'
  },
  actions: {
    flex: '0 0 auto'
  },
  numSelected: {
    flex: '1 1 auto',
    paddingRight: theme.spacing.unit * 3
  }
})

class TableToolbar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string,
    onDelete: PropTypes.func
  }

  handleDelete = () => {
    this.props.onDelete()
  }

  render () {
    const { numSelected, classes, title } = this.props
    return (
      <Toolbar className={classNames({ [classes.highlight]: numSelected > 0 })}>
        <div className={classes.title}>
          <Typography
            variant='title'
            color={numSelected > 0 ? 'primary' : 'inherit'}
          >
            {title}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.rightControls}>
          {numSelected > 0 && (
            <div className={classes.rightItems}>
              <div className={classes.numSelected}>
                <Typography variant='body1' color='primary'>
                  <strong>{numSelected}</strong> selected
                </Typography>
              </div>
              <div className={classes.actions}>
                <Tooltip title='Delete'>
                  <IconButton
                    variant='fab'
                    aria-label='Delete'
                    color='primary'
                    className={classes.button}
                    onClick={this.handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </Toolbar>
    )
  }
}

const TableToolbarStyled = withStyles(toolbarStyles)(TableToolbar)

const HeaderRow = ({ children }) => (
  <TableHead>
    <TableRow>{children}</TableRow>
  </TableHead>
)

HeaderRow.propTypes = {
  children: PropTypes.node
}

const tableStyles = theme => ({
  root: {}
})

class MaterialTable extends React.Component {
  static propTypes = {
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
        <TableToolbarStyled
          title={'Material UI Table'}
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

export default withStyles(tableStyles)(MaterialTable)
