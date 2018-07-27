import React from 'react'
import { mount } from 'enzyme'
import HeaderRow from '../../../src/table/material/header-row'

describe('Table Material HeaderRow', () => {
  describe('rendering', () => {
    test('Check the default rendering', () => {
      const wrapper = mount(<table><HeaderRow><td><div id='mock-header'/></td></HeaderRow></table>)
      expect(wrapper.find('div#mock-header').length).toBe(1)
    })

  })
})
