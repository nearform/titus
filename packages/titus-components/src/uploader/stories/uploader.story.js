import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Uploader from '../uploader'
import UploadService from '../services/UploadService'

const awsConfig = {
  accessKeyId: 'AKIAIUXKFC2ZUYCGZS6A',
  secretAccessKey: '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',
  region: 'eu-west-1'
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
        new UploadService({
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
        new UploadService({
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
