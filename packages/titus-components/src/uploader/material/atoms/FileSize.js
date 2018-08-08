import React from 'react'
import PropTypes from 'prop-types'

const sufixes = ['Bits', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const formatBits = (bits, hideUnity) => {
  const i = Math.floor(Math.log(bits) / Math.log(1024))
  return (
    (!bits && '0') ||
    (bits / Math.pow(1024, i)).toFixed(2) + (hideUnity ? '' : ` ${sufixes[i]}`)
  )
}

const FileSize = ({ bits, hideUnity }) => <span>{formatBits(bits, hideUnity)}</span>

FileSize.propTypes = {
  bits: PropTypes.number,
  hideUnity: PropTypes.bool
}

export default FileSize
