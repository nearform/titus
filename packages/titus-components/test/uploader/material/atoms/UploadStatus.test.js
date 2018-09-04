import React from 'react'
import { render } from 'react-testing-library'
import UploadStatus from '../../../../src/uploader/material/atoms/UploadStatus'
describe('uploader/material/atoms/UploadStatus', () => {
  test('With 0 progress and 0 size', () => {
    const { container } = render(<UploadStatus progress={0} size={0} />)
    expect(container.textContent).toBe('Uploaded: 0 / 0')
  })

  test('With 1 progress and 25000 size', () => {
    const { container } = render(<UploadStatus progress={1} size={25000} />)
    expect(container.textContent).toBe('Uploaded: 250.00 Bits / 24.41 KB')
  })

  test('With 20 progress and 25000 size', () => {
    const { container } = render(<UploadStatus progress={20} size={25000} />)
    expect(container.textContent).toBe('Uploaded: 4.88 KB / 24.41 KB')
  })

  test('With 80 progress and 25000 size', () => {
    const { container } = render(<UploadStatus progress={80} size={25000} />)
    expect(container.textContent).toBe('Uploaded: 19.53 KB / 24.41 KB')
  })

  test('With 100 progress and 25000 size', () => {
    const { container } = render(<UploadStatus progress={100} size={25000} />)
    expect(container.textContent).toBe('Uploaded: 24.41 KB / 24.41 KB')
  })

  test('With 100 progress and 25000 size', () => {
    const { container } = render(
      <UploadStatus progress={100} size={25000} done />
    )
    expect(container.textContent).toBe('Size: 24.41 KB, Upload Complete')
  })
})
