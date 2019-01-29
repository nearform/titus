import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { withFileUploader } from '../FileUploaderContext'
import withDropTarget, { getFilesFromFileDataTransfer } from './withDropTarget'

const styles = theme => ({
  container: {
    position: 'relative',
    zIndex: 0
  },
  input: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  dropAreaContainer: {
    position: 'relative',
    zIndex: 1
  },
  dropAreaContainerFocus: {
    boxShadow: `inset 0 0 0 2px ${theme.palette.primary.dark}`
  }
})

class UploadCard extends Component {
  constructor(props) {
    super(props)
    this.state = { focused: false }
    this.inputFile = React.createRef()
    this.handleFilesUpdate = this.handleFilesUpdate.bind(this)
    this.handleSelectFile = this.handleSelectFile.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
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

  handleFocus() {
    this.setState({
      focused: true
    })
  }

  handleBlur() {
    this.setState({
      focused: false
    })
  }

  render() {
    const {
      title,
      text,
      connectDropTarget,
      DropAreaComponent,
      fileUploader,
      classes
    } = this.props

    const dropAreaContainerClasses = [classes.dropAreaContainer]

    if (this.state.focused) {
      dropAreaContainerClasses.push(classes.dropAreaContainerFocus)
    }

    return connectDropTarget(
      <div onClick={this.handleClick} className={classes.container}>
        <input
          ref={this.inputFile}
          type="file"
          id="uploadfile"
          onChange={this.handleSelectFile}
          multiple={fileUploader.maxItems - fileUploader.files.length > 1}
          className={classes.input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className={dropAreaContainerClasses.join(' ')}>
          <DropAreaComponent
            text={text}
            title={title}
            error={fileUploader.dragOnUploadError}
          />
        </div>
      </div>
    )
  }
}

UploadCard.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  fileUploader: PropTypes.object,
  connectDropTarget: PropTypes.func,
  DropAreaComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired
}

export default withFileUploader(withDropTarget(withStyles(styles)(UploadCard)))
