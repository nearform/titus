import React from 'react'
import { render } from 'react-testing-library'
import DisplayCard from '../../../src/uploader/material/DisplayCard'
describe('uploader/material/DisplayCard', () => {
  test('With 80 progress and no preview', () => {
    const { getByTestId, container } = render(
      <DisplayCard
        uploadProgress={80}
        size={3500}
        title="Some title"
        name="a file name"
      />
    )

    expect(getByTestId('display-card-no-preview').textContent).toBe(
      'No Preview Available'
    )

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-title-"]')
        .textContent
    ).toBe('Some title')

    expect(getByTestId('upload-status').textContent).toBe(
      'Uploaded: 2.73 KB / 3.42 KB'
    )

    expect(
      container.querySelector('div li').getAttribute('class')
    ).not.toContain('DisplayCard-complete')
  })

  test('With 100 progress and no preview and done', () => {
    const { getByTestId, container } = render(
      <DisplayCard
        uploadProgress={100}
        size={3500}
        title="Some title"
        name="a file name"
        done
      />
    )

    expect(getByTestId('upload-status').textContent).toBe(
      'Size: 3.42 KB, Upload Complete'
    )

    expect(container.querySelector('div li').getAttribute('class')).toContain(
      'DisplayCard-complete'
    )
  })
  test('Without title', () => {
    const { container } = render(
      <DisplayCard uploadProgress={100} size={3500} name="a file name" />
    )

    expect(
      container.querySelector('div[class^="MuiGridListTileBar-title-"]')
        .textContent
    ).toBe('a file name')
  })

  test('With preview and title', () => {
    const { getByTestId, container } = render(
      <DisplayCard
        uploadProgress={100}
        size={3500}
        name="a file name"
        title="Some title"
        mediaImage="http://someurl"
      />
    )

    expect(() => getByTestId('display-card-no-preview')).toThrow(
      'Unable to find an element by: [data-testid="display-card-no-preview"]'
    )

    expect(container.querySelector('img').getAttribute('src')).toBe(
      'http://someurl'
    )
    expect(container.querySelector('img').getAttribute('title')).toBe(
      'Some title'
    )
  })

  test('With preview and no title', () => {
    const { getByTestId, container } = render(
      <DisplayCard
        uploadProgress={100}
        size={3500}
        name="a file name"
        mediaImage="http://someurl"
      />
    )

    expect(() => getByTestId('display-card-no-preview')).toThrow(
      'Unable to find an element by: [data-testid="display-card-no-preview"]'
    )

    expect(container.querySelector('img').getAttribute('src')).toBe(
      'http://someurl'
    )
    expect(container.querySelector('img').getAttribute('title')).toBe(
      'a file name'
    )
  })
})
