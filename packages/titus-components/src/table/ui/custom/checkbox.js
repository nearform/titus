import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = ({ checked }) => (
  <React.Fragment>
    <input
      type='checkbox'
      style={{
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none'
      }}
      onChange={() => ({})}
      checked={checked ? 'checked' : ''}
    />
    <span />
  </React.Fragment>
)

CheckBox.propTypes = {
  checked: PropTypes.bool
}

export default CheckBox
