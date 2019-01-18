import React from 'react'
import { UploaderService, Uploader } from '@nearform/titus-components'
import { Grid } from '@material-ui/core'
import { PageHeading } from '../utils'

const MORE_INFO = 'More info dialog content'
const SUB_HEADER = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.'

const awsConfig = {
  accessKeyId: process.env.REACT_APP_S3_UPLOADER_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_UPLOADER_SECRET_ACCESS_KEY,
  computeChecksums: true,
  sslEnabled: true
}

const s3Endpoint = (process.env.REACT_APP_S3_UPLOADER_ENDPOINT || '').trim()
// if using a custom endpoint, we assume that we are using fake-s3 minio or something else so some options need to be disabled to make it work
if (s3Endpoint) {
  awsConfig.s3 = {
    endpoint: s3Endpoint,
    s3BucketEndpoint: false,
    computeChecksums: false
  }
  awsConfig.s3ForcePathStyle = true
  awsConfig.sslEnabled = false
  awsConfig.computeChecksums = false
  awsConfig.region = process.env.REACT_APP_S3_UPLOADER_REGION
}

function getParams(file) {
  return {
    Key: file.id,
    Body: file.orig,
    ContentType: file.type,
    Metadata: { 'original-name': file.name }
  }
}

// TODO Tags are currently disabled due an access S3 policies issue
function getTags(file) {
  return [{ Key: 'OriginalName', Value: file.name }]
}

const UploaderPage = () => (
  <Grid container spacing={24}>
    <PageHeading header="Uploader" subHeader={SUB_HEADER} moreInfo={MORE_INFO}/>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Uploader
        maxItems={5}
        service={
          new UploaderService({
            awsConfig,
            bucket: process.env.REACT_APP_S3_UPLOADER_BUCKET,
            getParams,
            getTags
          })
        }
        onUploadDone={console.log}
        onUploadError={console.log}
      />
    </Grid>
  </Grid>
)

export default UploaderPage
