import React from 'react'
import { mount } from 'enzyme'
import { createMuiTheme } from '@material-ui/core/styles'

import Autocomplete from '../../src/autocomplete/autocomplete'

const sampleData = [
  { value: 'Abcd', key: 1 },
  { value: 'Cde', key: 2 },
  { value: 'zAbcd', key: 3 }
]

describe('Navigation', () => {
  describe('rendering', () => {
    test('Default rendering', () => {
      const wrapper = mount(<Autocomplete />)
      expect(wrapper.find('input').props().className).toContain(
        'MuiInput-input'
      )
    })
  })

  describe('Autocomplete actions', () => {
    test('No data or suggest funcion set', () => {
      const wrapper = mount(<Autocomplete />)
      const spy = jest.spyOn(wrapper.instance(), 'getSuggestions')

      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'Ab' } })

      expect(spy).toHaveReturnedWith([])
    })

    test('No input value set', () => {
      const wrapper = mount(<Autocomplete />)
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'Ab' } })

      const spy = jest.spyOn(wrapper.instance(), 'getSuggestions')

      input.simulate('change', { target: { value: '' } })
      expect(spy).toHaveReturnedWith([])
    })

    test('With value in data field', () => {
      const wrapper = mount(<Autocomplete data={sampleData} />)
      const spy = jest.spyOn(wrapper.instance(), 'getSuggestions')
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'Ab' } })

      expect(spy).toHaveReturnedWith([{ key: 1, value: 'Abcd' }])
    })

    test('With value in data field and filterType == contains', () => {
      const wrapper = mount(
        <Autocomplete filterType='contains' data={sampleData} />
      )
      const spy = jest.spyOn(wrapper.instance(), 'getSuggestions')
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'Ab' } })

      expect(spy).toHaveReturnedWith([
        { key: 1, value: 'Abcd' },
        { key: 3, value: 'zAbcd' }
      ])
    })

    test('With suggestion callback', () => {
      const mockSuggestion = jest.fn()
      const wrapper = mount(
        <Autocomplete
          filterType='suggestion'
          data={sampleData}
          onGetSuggestions={mockSuggestion}
        />
      )

      mockSuggestion.mockReturnValueOnce([
        { key: 1, value: 'AbcdSugg' },
        { key: 3, value: 'zAbcdSugg' }
      ])
      const spy = jest.spyOn(wrapper.instance(), 'getSuggestions')
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'Ab' } })

      expect(mockSuggestion).toHaveBeenCalledWith('Ab', 'suggestion', 5)
      expect(spy).toHaveReturnedWith([
        { key: 1, value: 'AbcdSugg' },
        { key: 3, value: 'zAbcdSugg' }
      ])
    })
  })

  describe('methods', () => {
    test('itemToString', () => {
      const wrapper = mount(
        <Autocomplete filterType='suggestion' data={sampleData} />
      )

      expect(wrapper.instance().itemToString({ value: 'foo' })).toBe('foo')
      expect(wrapper.instance().itemToString()).toBe('')
    })
  })
})
