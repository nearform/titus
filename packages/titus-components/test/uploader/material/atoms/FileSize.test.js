import React from 'react'
import { render } from 'react-testing-library'
import FileSize from '../../../../src/uploader/material/atoms/FileSize'
describe('uploader/material/atoms/FileSize', () => {
  test('With no bits', () => {
    const { container } = render(<FileSize />)
    expect(container.textContent).toBe('0')
  })

  test('With Bit bits', () => {
    const { container } = render(<FileSize bits={3} />)
    expect(container.textContent).toBe('3.00 Bits')
  })
  test('With KB bits', () => {
    const { container } = render(<FileSize bits={3000} />)
    expect(container.textContent).toBe('2.93 KB')
  })
  test('With MB bits', () => {
    const { container } = render(<FileSize bits={1234567} />)
    expect(container.textContent).toBe('1.18 MB')
  })
  test('With GB bits', () => {
    const { container } = render(<FileSize bits={5432167891} />)
    expect(container.textContent).toBe('5.06 GB')
  })
  test('With TB bits', () => {
    const { container } = render(<FileSize bits={4325432167891} />)
    expect(container.textContent).toBe('3.93 TB')
  })
})
