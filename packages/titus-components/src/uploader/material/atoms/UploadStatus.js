import React from 'react'
import PropTypes from 'prop-types'
import FileSize from './FileSize'

const UploadStatus = props =>
  props.progress === 100 && props.done ? (
    <span data-testid="upload-status">
      Size: <FileSize bits={props.size} />, Upload Complete
    </span>
  ) : (
    <span data-testid="upload-status">
      Uploaded:{' '}
      <FileSize bits={Math.floor((props.size / 100) * props.progress)} /> /{' '}
      <FileSize bits={props.size} />
    </span>
  )

UploadStatus.propTypes = {
  size: PropTypes.number,
  done: PropTypes.bool,
  progress: PropTypes.number
}

export default UploadStatus
