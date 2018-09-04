import React from 'react'
import PropTypes from 'prop-types'

const readFileThumbnailData = file =>
  new Promise(resolve => {
    if (!file.type.includes('image')) return resolve(undefined)

    const reader = new FileReader()
    reader.addEventListener(
      'load',
      function() {
        return resolve(reader.result)
      },
      false
    )

    reader.readAsDataURL(file.orig || file)
  })

class UploadDisplayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, done: false }
  }

  componentDidMount() {
    if (this.props && this.props.file) {
      const onUploadError = (e, err) => {
        this.props.fileUploader.onUploadError(e, this.props.file)
        this.setState({ error: e.message })
      }

      const onUploadDone = e => {
        this.props.fileUploader.onUploadDone(this.props.file)
        this.setState({ done: true })
      }

      const onProgress = (percent, uploadId, isMultipart) => {
        this.setState({ uploadProgress: percent, isMultipart })
      }

      readFileThumbnailData(this.props.file)
        .then(thumbData => {
          this.setState({ mediaImage: thumbData })
        })
        .catch(onUploadError)

      this.props.fileUploader.service.startUpload(
        this.props.file,
        onProgress,
        onUploadError,
        onUploadDone
      )

      this.abortUpload = this.props.fileUploader.service.abortUpload.bind(
        this,
        this.props.file,
        this.props.fileUploader.onUploadCancel
      )
    }
  }

  handleRemove = () => {
    this.props.fileUploader.removeFile(this.props.file.id)
  }

  componentWillUnmount() {
    if (!this.state.done && this.abortUpload) {
      this.abortUpload()
    }
  }

  render() {
    const { title, file, DisplayCardComponent } = this.props
    const { uploadProgress, mediaImage } = this.state

    return (
      <DisplayCardComponent
        uploadProgress={uploadProgress}
        title={title}
        id={file.id}
        name={file.name}
        mediaImage={mediaImage}
        size={file.orig.size}
        onAbortUpload={this.abortUpload}
        error={this.state.error}
        done={this.state.done}
        onRemove={this.handleRemove}
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
