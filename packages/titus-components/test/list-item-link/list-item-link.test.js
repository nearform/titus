import React from 'react'
import { shallow } from 'enzyme'
import ListItemLink from '../../src/list-item-link/list-item-link'
import ListItem from '@material-ui/core/ListItem'

describe('ListItemLink', () => {
  describe('rendering', () => {
    test('Default rendering', () => {
      const wrapper = shallow(<ListItemLink />)

      expect(wrapper.find(ListItem).length).toBe(1)
      expect(wrapper.find(ListItem).props().button).toBeTruthy()
    })
  })
})
