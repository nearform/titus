import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableCell from '@material-ui/core/TableCell'

const SortingHeaderCell = ({ onClick, isSorting, children }) => (
  <TableCell
    padding='checkbox'
    sortDirection={isSorting && !isSorting.asc ? 'desc' : 'asc'}
  >
    <Tooltip
      title={
        isSorting
          ? isSorting.asc
            ? 'Sorted Ascending'
            : 'Sorted Descending'
          : ''
      }
      enterDelay={300}
    >
      <TableSortLabel
        active={isSorting && true}
        direction={isSorting && !isSorting.asc ? 'desc' : 'asc'}
        onClick={onClick}
      >
        {children}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
)

SortingHeaderCell.propTypes = {
  onClick: PropTypes.func,
  isSorting: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default SortingHeaderCell
