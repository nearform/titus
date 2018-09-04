const createService = (options = {}) =>
  class UploadService {
    onUploadFileChange(value) {
      options.onUploadFileChange && options.onUploadFileChange(value)
    }

    startUpload(file, reportProgress, onUploadError, onUploadDone) {
      return options.startUpload(
        file,
        reportProgress,
        onUploadError,
        onUploadDone
      )
    }

    abortUpload(value) {
      return options.abortUpload ? options.abortUpload(value) : null
    }
  }

export default createService
