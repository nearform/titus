export interface UploaderServiceOptions {
  awsConfig?: object
  bucket: string
  getParams?: (file: object) => object
  getTags?: (file: object) => Array<{ Key: string; Value: string }>
}

declare class UploaderService {
  constructor(options: UploaderServiceOptions)
}
export default UploaderService
