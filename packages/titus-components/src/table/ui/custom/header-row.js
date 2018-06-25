import React from 'react'
import PropTypes from 'prop-types'

const HeaderRow = ({ children }) => (
  <thead style={{ display: 'table-header-group' }}>
    <tr>{children}</tr>
  </thead>
)

HeaderRow.propTypes = {
  children: PropTypes.node
}

export default HeaderRow
