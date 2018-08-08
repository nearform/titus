import React from 'react'
import PropTypes from 'prop-types'

const readFileThumbnailData = file =>
  new Promise(resolve => {
    if (!file.type.includes('image')) return resolve(undefined)

    const reader = new FileReader()
    reader.addEventListener(
      'load',
      function () {
        return resolve(reader.result)
      },
      false
    )

    reader.readAsDataURL(file.orig || file)
  })

class UploadDisplayCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checkedG: true }
    this.handleUploadChange = this.handleUploadChange.bind(this)
  }

  componentDidMount () {
    if (this.props && this.props.file && this.props.file) {
      const onUploadError = (e, err) => {
        this.props.fileUploader.onUploadError(e, this.props.file)
      }

      const onUploadDone = e => {
        this.props.fileUploader.onUploadDone(this.props.file)
      }

      readFileThumbnailData(this.props.file)
        .then(thumbData => {
          this.setState({ mediaImage: thumbData })
        })
        .catch(onUploadError)

      this.props.fileUploader.service
        .startUpload(this.props.file, this.reportProgress, onUploadError)
        .then(onUploadDone)
        .catch(e => {
          if (e.code === 'RequestAbortedError') return
          this.props.fileUploader.logger.error(e.message)
        })

      this.abortUpload = this.props.fileUploader.service.abortUpload.bind(
        this,
        this.props.file,
        this.props.fileUploader.onUploadCancel
      )
    }
  }

  reportProgress = (percent, uploadId, isMultipart, extraParams) => {
    this.setState({
      progress: {
        uploadId,
        percent,
        isMultipart,
        fileName: extraParams.fileName
      }
    })
  }

  handleUploadChange = (progress, file, isMultipart, multipartParams) => {
    this.setState({ uploadProgress: progress, isMultipart, multipartParams })
  }

  render () {
    const { title, file, fileUploader, DisplayCardComponent } = this.props
    const { uploadProgress, mediaImage } = this.state

    fileUploader.service.onUploadFileChange(file, this.handleUploadChange)

    return (
      <DisplayCardComponent
        uploadProgress={uploadProgress}
        title={title}
        name={file.name}
        mediaImage={mediaImage}
        size={file.orig.size}
        onAbortUpload={this.abortUpload}
      />
    )
  }
}

UploadDisplayCard.propTypes = {
  title: PropTypes.string,
  file: PropTypes.object,
  fileUploader: PropTypes.object,
  DisplayCardComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired
}

export default UploadDisplayCard
