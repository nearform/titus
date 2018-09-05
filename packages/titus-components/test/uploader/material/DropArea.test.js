import React from 'react'
import { render } from 'react-testing-library'

import DropArea from '../../../src/uploader/material/DropArea'

describe('uploader/material/DropArea', () => {
  test('With no props', () => {
    const { container } = render(<DropArea />)

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-title-"]')
        .textContent
    ).toBe('Upload')

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-subtitle-"]')
        .textContent
    ).toBe('Drag here your file')
  })

  test('With title and text', () => {
    const { container } = render(
      <DropArea title="Another title" text="Another text" />
    )

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-title-"]')
        .textContent
    ).toBe('Another title')

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-subtitle-"]')
        .textContent
    ).toBe('Another text')
  })

  test('With error', () => {
    const { container } = render(
      <DropArea title="Another title" text="Another text" error="Some error" />
    )

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-title-"]')
        .textContent
    ).toBe('Another title')

    expect(
      container.querySelector('div[class^="DropAreaBase-error"]').textContent
    ).toBe('Some error')
  })
})
