// https://github.com/kentcdodds/react-testing-library/issues/93
describe('uploader/services/UploaderService', () => {
  test('Start Upload', () => {
    const mockConfigUpdate = jest.fn()
    const mockAws = {
      config: mockConfigUpdate
    }

    const mockOn = jest.fn()
    const mockAbort = jest.fn()
    let httpUploadProgressCb
    let sendCb
    class S3ManagedUpload {
      on(string, callback) {
        httpUploadProgressCb = callback
        return {
          send: sendCallback => {
            sendCb = sendCallback
          }
        }
      }
      abort() {
        return mockAbort()
      }
    }
    mockOn.mockReturnValue({})

    const mockManagedUpload = S3ManagedUpload
    jest.mock('aws-sdk/lib/core.js', () => mockAws)
    jest.mock('aws-sdk/clients/s3', () => {})
    jest.mock('aws-sdk/lib/s3/managed_upload.js', () => mockManagedUpload)

    const UploaderService = require('../../../src/uploader/services/UploaderService')
      .default

    const options = {}
    const uploaderService = new UploaderService(options)

    const file = {
      id: '1234566',
      name: 'UUID_a_sample_file_name.png',
      orig: {
        name: 'a_sample_file_name.png'
      },
      type: 'image/png'
    }
    const onProgress = jest.fn()
    const onError = jest.fn()
    const onUploadDone = jest.fn()
    uploaderService.startUpload(file, onProgress, onError, onUploadDone)

    httpUploadProgressCb({ loaded: 20, part: 1, total: 100 })
    expect(onProgress).toHaveBeenCalledWith(20, '1234566', false)
    onProgress.mockClear()
    httpUploadProgressCb({ loaded: 80, part: 1, total: 100 })
    expect(onProgress).toHaveBeenCalledWith(80, '1234566', false)

    sendCb()
    expect(onUploadDone).toHaveBeenCalledWith({
      name: 'a_sample_file_name.png'
    })

    sendCb({ code: 100 })
    expect(onError).toHaveBeenCalledWith(
      {
        code: 100
      },
      { name: 'a_sample_file_name.png' }
    )
  })
})
