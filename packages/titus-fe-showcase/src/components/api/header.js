import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, Checkbox } from '@material-ui/core'
import { TableHeaderRow, TableHeader } from '@nearform/react-table'
import { HeaderRow, SortingHeaderCell } from './'

const Header = ({ handleRowSelect, selecting, columns }) => (
  <TableHeaderRow component={HeaderRow}>
    {[
      <TableHeader key="select-all">
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            value="all"
            onClick={handleRowSelect}
            checked={selecting[0] === 'all'}
          />
        </TableCell>
      </TableHeader>,
      ...columns.reduce((acc, curr, index) => {
        if (curr.accessor) {
          acc.push(
            <TableHeader {...curr} key={index} component={SortingHeaderCell}>
              {curr.label}
            </TableHeader>
          )
        }
        return acc
      }, [])
    ]}
  </TableHeaderRow>
)

Header.propTypes = {
  handleRowSelect: PropTypes.func,
  selecting: PropTypes.array,
  columns: PropTypes.array
}

export default Header
