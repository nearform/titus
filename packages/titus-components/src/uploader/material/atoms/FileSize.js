import React from 'react'
import PropTypes from 'prop-types'

const sufixes = ['Bits', 'KB', 'MB', 'GB', 'TB']

const formatBits = bits => {
  const i = Math.floor(Math.log(bits) / Math.log(1024))
  return (
    (!bits && '0') || (bits / Math.pow(1024, i)).toFixed(2) + ` ${sufixes[i]}`
  )
}

const FileSize = ({ bits }) => <span>{formatBits(bits)}</span>

FileSize.propTypes = {
  bits: PropTypes.number
}

export default FileSize
