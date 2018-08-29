import React from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableRow } from '@material-ui/core'

const HeaderRow = ({ children }) => (
  <TableHead>
    <TableRow>{children}</TableRow>
  </TableHead>
)

HeaderRow.propTypes = {
  children: PropTypes.node
}

export default HeaderRow
