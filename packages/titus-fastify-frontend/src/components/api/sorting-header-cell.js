import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip, TableSortLabel, TableCell } from '@material-ui/core'

const SortingHeaderCell = ({ onClick, isSorting, children, hidden, width }) =>
  !hidden && (
    <TableCell
      padding="checkbox"
      style={{ width }}
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
          active={Boolean(isSorting)}
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
