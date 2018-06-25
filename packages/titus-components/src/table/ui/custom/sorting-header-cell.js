import React from 'react'
import PropTypes from 'prop-types'

import UpArrow from './baseline-arrow_upward-24px.svg'
import DownArrow from './baseline-arrow_downward-24px.svg'

const SortingHeaderCell = ({ onClick, isSorting, children }) => (
  <th
    onClick={onClick}
    style={{
      userSelect: 'none',
      color: `${isSorting ? '#000' : 'rgba(0, 0, 0, 0.54)'}`,
      fontWeight: 500,
      fontSize: '0.75rem',
      display: 'table-cell',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      padding: '2em 0.25em 1em'
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {isSorting &&
          (isSorting.asc ? (
            <img
              style={{
                position: 'absolute',
                left: '-2em',
                width: '1.5em'
              }}
              src={DownArrow}
              alt='down-arrow'
            />
          ) : (
            <img
              style={{
                position: 'absolute',
                left: '-2em',
                width: '1.5em'
              }}
              src={UpArrow}
              alt='up-arrow'
            />
          ))}
        {children}
      </div>
    </div>
  </th>
)

SortingHeaderCell.propTypes = {
  onClick: PropTypes.func,
  isSorting: PropTypes.object,
  children: PropTypes.node
}

export default SortingHeaderCell
