// Import only the required files from AWS (the complete bundle is ~1.7M
import AWS from 'aws-sdk/lib/core.js'
import 'aws-sdk/clients/s3'
import S3ManagedUpload from 'aws-sdk/lib/s3/managed_upload.js'

let pendingAbortUploads = {}

const partSize = parseInt(process.env.REACT_APP_S3_PART_SIZE, 10) || 5242880
const queueSize = parseInt(process.env.REACT_APP_S3_QUEUE_SIZE, 10) || 4

class AWSS3ManagedUpload {
  constructor (id, bucket, params, tags) {
    const uploadParams = {
      partSize,
      queueSize,
      params: Object.assign({}, { Bucket: bucket }, params)
    }

    // FIXME Adding tags returns an "access denied error", investigate S3 policies to allow it
    // tags && (uploadParams.tags = tags)

    this.s3Upload = new S3ManagedUpload(uploadParams)
    this.file = params.Body
    this.uploadId = id
    this.uploadFile = this.uploadFile.bind(this)
    this.abortUpload = this.abortUpload.bind(this)
  }

  uploadFile (onProgress, cb) {
    return new Promise((resolve, reject) => {
      return this.s3Upload
        .on('httpUploadProgress', progress => {
          let isMultipart = progress && progress.part > 1
          if (!isMultipart) {
            isMultipart = progress.total > partSize
          }

          onProgress(progress, this.uploadId, isMultipart, {
            uploadId: this.uploadId,
            partNumber: progress.part,
            fileName: this.file.name
          })
        })
        .send(err => {
          if (err) {
            cb(err, this.file)
            reject(err)
          } else {
            resolve(this.file)
          }
        })
    })
  }

  abortUpload () {
    return this.s3Upload.abort()
  }
}

const fileOnProgress = (onProgress, file) => (
  progress,
  uploadId,
  isMultipart,
  extra
) => {
  if (typeof onProgress === 'function') {
    const percent = Math.round(progress.loaded / progress.total * 100)
    onProgress(
      percent,
      uploadId,
      isMultipart,
      Object.assign({}, extra, { fileName: file.name })
    )
  }
}

const fileOnError = onError => (err, file) => {
  if (typeof onError === 'function') {
    onError(err, file)
  }
}

class UploaderService {
  constructor (options) {
    this.bucket = options.bucket
    this.getParams = options.getParams || this.getDefaultParams
    this.getTags = options.getTags
    if (options.awsConfig) {
      if (typeof AWS !== 'undefined') {
        AWS.config.update(options.awsConfig)
      }
    }
  }

  getDefaultParams (file) {
    return {
      Key: file.name,
      Body: file.orig,
      ContentType: file.type
    }
  }

  clear () {
    pendingAbortUploads = {}
    return this
  }

  startUpload (file, onProgress, onError) {
    const upload = new AWSS3ManagedUpload(
      file.id,
      this.bucket,
      this.getParams(file),
      this.getTags ? this.getTags(file) : null
    )
    pendingAbortUploads[upload.uploadId] = upload.abortUpload
    return upload.uploadFile(
      fileOnProgress(onProgress, file.orig),
      fileOnError(onError)
    )
  }

  abortUpload (file, cb) {
    try {
      const abortFunc = pendingAbortUploads[file.id]
      if (typeof abortFunc === 'function') abortFunc()
      cb(null, file)
    } catch (e) {
      cb(e, file)
    }
  }
}

export default UploaderService
