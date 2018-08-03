import React from 'react'
import { render } from 'react-testing-library'

import HeaderRow from '../../../src/table/material/header-row'

describe('Table Material HeaderRow', () => {
  describe('rendering', () => {
    test('Check the default rendering', () => {
      const { container } = render(
        <table>
          <HeaderRow>
            <td>
              <div id='mock-header' />
            </td>
          </HeaderRow>
        </table>
      )
      expect(container.querySelector('div#mock-header')).not.toBeNull()
    })
  })
})
