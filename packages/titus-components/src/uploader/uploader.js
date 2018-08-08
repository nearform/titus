import React from 'react'
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend-filedrop'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import { FileUploaderContext } from './FileUploaderContext'

import UploaderContainer from './material/UploaderContainer'

class Uploader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      files: [],
      maxItems: this.props.maxItems,
      addFiles: this.handleAddFile.bind(this),
      service: this.props.service,
      dragOnUploadError: null,
      logger: this.props.logger || console,
      onUploadError: this.handleUploadError.bind(this),
      onUploadDone: this.handleUploadDone.bind(this),
      onUploadCancel: this.handleUploadCancel.bind(this)
    }
  }

  handleUploadCancel (file) {
    this.state.logger.log('Cancel', file)
  }

  handleUploadDone (file) {
    this.props.onUploadDone && this.props.onUploadDone(file)
  }

  handleUploadError (err, file) {
    this.props.onUploadError && this.props.onUploadError(err, file)
  }

  handleAddFile (files) {
    if (files.find(file => file.isDirectory)) {
      this.setState({ dragOnUploadError: 'Directory are not allowed' })
      return
    }

    if (this.props.maxItems === 1 && files.length > 1) {
      this.setState({ dragOnUploadError: 'Only one file allowed' })
      return
    }
    if (files.length + this.state.files.length > this.props.maxItems) {
      this.setState({ dragOnUploadError: 'Too many files added' })
      return
    }
    this.setState({
      files: [...this.state.files, ...files],
      dragOnUploadError: null
    })
  }

  render () {
    return (
      <FileUploaderContext.Provider value={this.state}>
        <DragDropContextProvider backend={HTML5Backend}>
          <UploaderContainer maxItems={this.props.maxItems} />
        </DragDropContextProvider>
      </FileUploaderContext.Provider>
    )
  }
}

Uploader.defaultProps = {
  maxItems: 1
}

Uploader.propTypes = {
  maxItems: PropTypes.number,
  service: PropTypes.object,
  logger: PropTypes.object,
  onUploadDone: PropTypes.func,
  onUploadError: PropTypes.func
}

export default DragDropContext(HTML5Backend)(Uploader)
