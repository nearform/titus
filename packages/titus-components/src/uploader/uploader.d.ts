import * as React from 'react'

export interface UploaderProps {
  maxItems?: number
  service?: object
  logger?: object
  onUploadDone?: (file: object) => void
  onUploadError?: (error: any, file: object) => void
}

declare class Uploader extends React.Component<UploaderProps> {}
export default Uploader
