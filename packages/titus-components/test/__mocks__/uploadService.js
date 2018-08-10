const createService = (options = {})=>
  class UploadService {
    onUploadFileChange (value) {
      options.onUploadFileChange && options.onUploadFileChange(value)
    }

    startUpload (file, reportProgress, onUploadError) {
      return options.startUpload(file, reportProgress, onUploadError)
    }
    abortUpload (value) {
      return options.abortUpload(value)
    }
  }

export default createService
