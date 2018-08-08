import React from 'react'
import PropTypes from 'prop-types'
import FileSize from './FileSize'

const UploadStatus = props =>
  props.progress === 100 ? (
    <span>
      Size: <FileSize bits={props.size} />, Upload Complete
    </span>
  ) : (
    <span>
      Uploaded:{' '}
      <FileSize
        bits={Math.floor(props.size / 100 * props.progress)}
        hideUnity
      />{' '}
      / <FileSize bits={props.size} />
    </span>
  )

UploadStatus.propTypes = {
  size: PropTypes.number,
  progress: PropTypes.number
}

export default UploadStatus
