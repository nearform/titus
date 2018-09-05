import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withFileUploader } from '../FileUploaderContext'
import withDropTarget, { getFilesFromFileDataTransfer } from './withDropTarget'
class UploadCard extends Component {
  constructor(props) {
    super(props)
    this.inputFile = React.createRef()
    this.handleFilesUpdate = this.handleFilesUpdate.bind(this)
    this.handleSelectFile = this.handleSelectFile.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSelectFile(event) {
    getFilesFromFileDataTransfer(event.target, true)
      .then(files => {
        this.handleFilesUpdate(files)
      })
      .catch(this.props.fileUploader.logger)
  }

  handleClick() {
    this.inputFile.current.click()
  }

  handleFilesUpdate(files) {
    this.props.fileUploader.addFiles(files)
  }

  render() {
    const {
      title,
      text,
      connectDropTarget,
      DropAreaComponent,
      fileUploader
    } = this.props

    return connectDropTarget(
      <div onClick={this.handleClick}>
        <DropAreaComponent
          text={text}
          title={title}
          error={fileUploader.dragOnUploadError}
        />
        <div style={{ display: 'none' }}>
          <input
            ref={this.inputFile}
            type="file"
            id="uploadfile"
            onChange={this.handleSelectFile}
            multiple={fileUploader.maxItems - fileUploader.files.length > 1}
          />
        </div>
      </div>
    )
  }
}

UploadCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  fileUploader: PropTypes.object,
  connectDropTarget: PropTypes.func,
  DropAreaComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired
}

export default withFileUploader(withDropTarget(UploadCard))
