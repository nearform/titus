import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Uploader from '../uploader'
import UploaderService from '../services/UploaderService'

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

storiesOf('Uploader', module)
  .add('default (1 file)', () => (
    <Uploader
      service={
        new UploaderService({
          awsConfig,
          bucket: 'titus-uploader-471234098732409871234',
          getParams,
          getTags
        })
      }
      onUploadDone={action('OnUploadDone')}
      onUploadError={action('OnUploadError')}
    />
  ))
  .add('5 files', () => (
    <Uploader
      maxItems={5}
      service={
        new UploaderService({
          awsConfig,
          bucket: 'titus-uploader-471234098732409871234',
          getParams,
          getTags
        })
      }
      onUploadDone={action('OnUploadDone')}
      onUploadError={action('OnUploadError')}
    />
  ))
