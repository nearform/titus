import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'
import {
  renderIntoDocument,
  Simulate,
  scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils'
import TestBackend from 'react-dnd-test-backend'
import createService from '../__mocks__/uploadService'
import DropArea from '../../src/uploader/material/DropArea'

const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))
// https://github.com/kentcdodds/react-testing-library/issues/93
describe('uploader/uploader', () => {
  test('With no props', () => {
    const onUploadDoneMock = jest.fn()
    const onUploadErrorMock = jest.fn()
    const getParams = jest.fn()
    const getTags = jest.fn()

    const Uploader = require('../../src/uploader/uploader').default
    const awsConfig = {
      accessKeyId: 'AKIAIUXKFDIWNCOOASDO',
      secretAccessKey: 'sdlfo9efd98e3dnfwp89fqjpfwfwp',
      region: 'eu-west-1'
    }

    const { container } = render(
      <Uploader
        service={
          new (createService())({
            awsConfig,
            bucket: 'titus-uploader-471234098732409871234',
            getParams,
            getTags
          })
        }
        onUploadDone={onUploadDoneMock}
        onUploadError={onUploadErrorMock}
      />
    )

    expect(
      container.querySelector(
        'li[class*="DropAreaBase-tile-"] div[class^="MuiGridListTileBar-title-"]'
      ).textContent
    ).toBe('To upload drag your file')
  })

  test('With maxItems', () => {
    const onUploadDoneMock = jest.fn()
    const onUploadErrorMock = jest.fn()
    const getParams = jest.fn()
    const getTags = jest.fn()

    const awsConfig = {
      accessKeyId: 'AKIAIUXKFDIWNCOOASDO',
      secretAccessKey: 'sdlfo9efd98e3dnfwp89fqjpfwfwp',
      region: 'eu-west-1'
    }

    const Uploader = require('../../src/uploader/uploader').default
    const { container } = render(
      <Uploader
        service={
          new (createService())({
            awsConfig,
            bucket: 'titus-uploader-471234098732409871234',
            getParams,
            getTags
          })
        }
        onUploadDone={onUploadDoneMock}
        onUploadError={onUploadErrorMock}
        maxItems={5}
      />
    )

    expect(
      container.querySelector(
        'li[class*="DropAreaBase-tile-"] div[class^="MuiGridListTileBar-title-"]'
      ).textContent
    ).toBe('To upload drag your files')
    expect(
      container.querySelector(
        'li[class*="DropAreaBase-tile-"] div[class^="MuiGridListTileBar-subtitle-"]'
      ).textContent
    ).toBe('Uploaded 0 of 5')
  })

  test('With input focus', () => {
    const onUploadDoneMock = jest.fn()
    const onUploadErrorMock = jest.fn()
    const getParams = jest.fn()
    const getTags = jest.fn()

    const Uploader = require('../../src/uploader/uploader').default
    const awsConfig = {
      accessKeyId: 'AKIAIUXKFDIWNCOOASDO',
      secretAccessKey: 'sdlfo9efd98e3dnfwp89fqjpfwfwp',
      region: 'eu-west-1'
    }

    const { container } = render(
      <Uploader
        service={
          new (createService())({
            awsConfig,
            bucket: 'titus-uploader-471234098732409871234',
            getParams,
            getTags
          })
        }
        onUploadDone={onUploadDoneMock}
        onUploadError={onUploadErrorMock}
      />
    )

    let inputElement = container.querySelector('input[type="file"]')
    let dropAreaContainer = inputElement.nextElementSibling

    Simulate.focus(inputElement)
    expect(
      dropAreaContainer.className.indexOf('UploadCard-dropAreaContainerFocus-')
    ).toBeGreaterThan(-1)
  })

  test('Click on fileInput and add a file', async () => {
    const onUploadDoneMock = jest.fn()
    const onUploadErrorMock = jest.fn()
    const getParams = jest.fn()
    const getTags = jest.fn()

    const Uploader = require('../../src/uploader/uploader').default
    const awsConfig = {
      accessKeyId: 'AKIAIUXKFDIWNCOOASDO',
      secretAccessKey: 'sdlfo9efd98e3dnfwp89fqjpfwfwp',
      region: 'eu-west-1'
    }

    let resolvePromise
    let rejectPromise
    let reportProgressCb
    let uploadDoneCb
    let fileUploaded

    const startUploadMock = (
      file,
      reportProgress,
      onUploadError,
      onUploadDone
    ) => {
      fileUploaded = file
      reportProgressCb = reportProgress
      uploadDoneCb = onUploadDone
      const returnpromise = new Promise((resolve, reject) => {
        resolvePromise = resolve
        rejectPromise = reject
      })
      return returnpromise
    }
    const { container } = render(
      <Uploader
        service={
          new (createService({
            startUpload: startUploadMock
          }))({
            awsConfig,
            bucket: 'titus-uploader-471234098732409871234',
            getParams,
            getTags
          })
        }
        onUploadDone={onUploadDoneMock}
        onUploadError={onUploadErrorMock}
        maxItems={2}
      />
    )

    Simulate.click(container.querySelector('li[class*="DropAreaBase-tile-"]'))
    let inputElement = container.querySelector('input[id="uploadfile"]')
    let file = new File(['testfile'], 'myfile.png', {
      type: 'image/png'
    })
    Simulate.change(inputElement, { target: { files: [file] } })

    await wait(() => container.querySelector('li[class*="DisplayCard-tile-"]'))

    expect(
      container.querySelector(
        'li[class*="DisplayCard-tile-"] div[class^="MuiGridListTileBar-subtitle"] span span'
      ).textContent
    ).toBe('0')
    resolvePromise()

    reportProgressCb(20, fileUploaded.id, false, {})
    await wait(
      () =>
        container.querySelector(
          'li[class*="DisplayCard-tile-"] div[class^="MuiGridListTileBar-subtitle"] span span'
        ).textContent === '1.00 Bits'
    )
    reportProgressCb(80, fileUploaded.id, false, {})
    await wait(
      () =>
        container.querySelector(
          'li[class*="DisplayCard-tile-"] div[class^="MuiGridListTileBar-subtitle"] span span'
        ).textContent === '6.00 Bits'
    )

    reportProgressCb(100, fileUploaded.id, false, {})
    uploadDoneCb()
    await wait(
      () =>
        container.querySelector(
          'li[class*="DisplayCard-tile-"] div[class^="MuiGridListTileBar-subtitle"] span span'
        ).textContent === '8.00 Bits'
    )

    expect(
      container.querySelector(
        'li[class*="DisplayCard-tile-"] div[class^="MuiGridListTileBar-subtitle"] span'
      ).textContent
    ).toBe('Size: 8.00 Bits, Upload Complete')

    expect(
      container.querySelector(
        'li[class*="DropAreaBase-tile-"] div[class^="MuiGridListTileBar-title-"]'
      ).textContent
    ).toBe('To upload drag your files')

    expect(
      container.querySelector(
        'li[class*="DropAreaBase-tile-"] div[class^="MuiGridListTileBar-subtitle-"]'
      ).textContent
    ).toBe('Uploaded 1 of 2')

    Simulate.click(container.querySelector('li[class*="DropAreaBase-tile-"]'))
    inputElement = container.querySelector('input[id="uploadfile"]')
    file = new File(['anotherfile'], 'myfile2.png', {
      type: 'image/png'
    })
    Simulate.change(inputElement, { target: { files: [file] } })

    await wait(
      () =>
        container.querySelectorAll('li[class*="DisplayCard-tile-"]').length ===
        2
    )

    expect(
      container.querySelector('li[class*="DropAreaBase-tile-"]')
    ).toBeNull()
  })
})
