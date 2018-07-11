import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import {
  TableHeaderRow as NfTableHeaderRow,
  TableHeader as NfTableHeader
} from '@nearform/react-table'
import HeaderRow from './header-row'
import SortingHeaderCell from './sorting-header-cell'

const Header = ({ handleRowSelect, selecting, columns }) => (
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
            <NfTableHeader {...curr} key={index} component={SortingHeaderCell}>
              {curr.label}
            </NfTableHeader>
          )
        }
        return acc
      }, [])
    ]}
  </NfTableHeaderRow>
)

Header.propTypes = {
  handleRowSelect: PropTypes.func,
  selecting: PropTypes.array,
  columns: PropTypes.array
}

export default Header
