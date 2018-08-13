import React from 'react'
import { UploaderService, Uploader } from '@nearform/titus-components'

const awsConfig = {
  accessKeyId: 'ignored',
  secretAccessKey: 'ignored',
  region: 'ignored',
  computeChecksums: false,
  sslEnabled: false,
  s3ForcePathStyle: true,
  s3: {
    endpoint: 'http://localhost:4569',
    s3BucketEndpoint: false,
    computeChecksums: false
  }
}

function getParams (file) {
  return {
    Key: file.id,
    Body: file.orig,
    ContentType: file.type,
    Metadata: { 'original-name': file.name }
  }
}

// TODO Tags are currently disabled due an access S3 policies issue
function getTags (file) {
  return [{ Key: 'OriginalName', Value: file.name }]
}

const UploaderPage = () => (
  <Uploader
    maxItems={5}
    service={
      new UploaderService({
        awsConfig,
        bucket: 'titus-uploader',
        getParams,
        getTags
      })
    }
    onUploadDone={console.log}
    onUploadError={console.log}
  />
)

export default UploaderPage
