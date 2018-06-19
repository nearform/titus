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
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { theme } from '../../../../theme/theme'

function TableCellSort ({ onClick, isSorting, children }) {
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

TableCellSort.propTypes = {
  onClick: PropTypes.func,
  isSorting: PropTypes.object,
  children: PropTypes.any
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
  handleDelete = () => {
    this.props.onDelete()
  };

  render () {
    const { numSelected, classes, title } = this.props

    return (
      <Toolbar
        className={classNames(
          classes.root,
          numSelected > 0 ? classes.highlight : null
        )}
      >
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
          {numSelected > 0 ? (
            <div className={classes.rightItems}>
              <div className={classes.numSelected}>
                <Typography variant='body1' color='primary'>
                  <b>{numSelected}</b> selected
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
          ) : null}
        </div>
      </Toolbar>
    )
  }
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
  onDelete: PropTypes.func
}

const TableToolbarStyled = withStyles(toolbarStyles)(TableToolbar)

const tableStyles = theme => ({
  root: {}
})

function HeaderRowComponents ({ children }) {
  return (
    <TableHead>
      <TableRow>{children}</TableRow>
    </TableHead>
  )
}

HeaderRowComponents.propTypes = {
  children: PropTypes.any
}

class MaterialUiTableProp extends React.Component {
  handleDelete = () => {
    this.props.onDelete(this.props.data.selecting)
  };

  render () {
    const { data, classes } = this.props

    const {
      columns,
      rows,
      handleRowSelect,
      selecting,
      pageSize,
      total,
      currentPage,
      handlePageChangeBlur,
      handlePageSizeChange
    } = data

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Paper className={classes.root}>
            <TableToolbarStyled
              title={'Material UI Table'}
              onDelete={this.handleDelete}
              numSelected={
                selecting[0] === 'all' ? rows.length : selecting.length
              }
            />
            <Table>
              <TableHeaderRow component={HeaderRowComponents}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    onClick={e => {
                      handleRowSelect('all')
                    }}
                    checked={selecting[0] === 'all'}
                  />
                </TableCell>

                {columns.map(
                  ({ accessor, sortable, label }, index) =>
                    accessor ? (
                      <TableHeader
                        key={index}
                        sortable={sortable}
                        accessor={accessor}
                        component={TableCellSort}
                      >
                        {label}
                      </TableHeader>
                    ) : null
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
              </TableBody>
            </Table>
            <TablePagination
              component='div'
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
          </Paper>
        </MuiThemeProvider>
      </React.Fragment>
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
  };
}

MaterialUiTableProp.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func
}

export default withStyles(tableStyles)(MaterialUiTableProp)
