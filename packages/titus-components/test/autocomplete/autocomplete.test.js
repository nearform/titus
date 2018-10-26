import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Autocomplete from '../../src/autocomplete/autocomplete'

const sampleData = [
  { value: 'Abcd', key: 1 },
  { value: 'Cde', key: 2 },
  { value: 'zAbcd', key: 3 }
]

describe('Navigation', () => {
  it('should be defined', () => {
    expect(Autocomplete).toBeDefined()
  })

  describe('Rendering', () => {
    test('Default rendering', () => {
      const { container } = render(<Autocomplete />)
      expect(container.querySelector('input').getAttribute('class')).toContain(
        'MuiInput-input'
      )
    })
  })

  describe('Standard TextField props', () => {
    test('Required', () => {
      const { container } = render(<Autocomplete required />)
      expect(container.querySelector('input').required).toBe(true)
    })

    test('Disabled', () => {
      const { container } = render(<Autocomplete disabled />)
      expect(container.querySelector('input').disabled).toBe(true)
    })

    test('Readonly', () => {
      const { container } = render(<Autocomplete readOnly />)
      expect(container.querySelector('input').readOnly).toBe(true)
    })

    test('Error', () => {
      const { container } = render(<Autocomplete error />)
      expect(
        container.querySelector('input[aria-invalid="true"]')
      ).not.toBeNull()
    })

    test('With label', () => {
      const { container } = render(<Autocomplete label="Example" />)
      const label = container.querySelector('label')
      expect(label).not.toBeNull()
      expect(label.textContent).toBe('Example')
    })

    test('With helper text', () => {
      const { container } = render(<Autocomplete helperText="Example" />)
      const helperText = container.querySelector('p')
      expect(helperText).not.toBeNull()
      expect(helperText.textContent).toBe('Example')
    })
  })

  describe('Autocomplete actions', () => {
    test('With no data', () => {
      const { container } = render(<Autocomplete />)

      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)
      const options = container.querySelectorAll('div[role="option"]')
      expect(options.length).toBe(0)
    })

    test('With no input value', () => {
      const { container } = render(<Autocomplete data={sampleData} />)

      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)
      input.value = ''
      fireEvent.change(input)
      const options = container.querySelectorAll('div[role="option"]')
      expect(options.length).toBe(0)
    })

    test('No filterType set', () => {
      const { container } = render(<Autocomplete data={sampleData} />)

      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)
      const options = container.querySelectorAll('div[role="option"]')

      expect(options.length).toBe(1)
      expect(options[0].textContent).toBe('Abcd')
    })

    test('With filtertype startsWith', () => {
      const { container } = render(
        <Autocomplete data={sampleData} filterType="startsWith" />
      )

      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)
      const options = container.querySelectorAll('div[role="option"]')

      expect(options.length).toBe(1)
      expect(options[0].textContent).toBe('Abcd')
    })

    test('With contains', () => {
      const { container } = render(
        <Autocomplete data={sampleData} filterType="contains" />
      )

      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)
      const options = container.querySelectorAll('div[role="option"]')

      expect(options.length).toBe(2)
      expect(options[0].textContent).toBe('Abcd')
      expect(options[1].textContent).toBe('zAbcd')
    })

    test('With suggestion callback', () => {
      let loading = true
      const mockHandleInputChange = jest.fn(() => {
        loading = false
      })
      const items = [
        { key: 1, value: 'AbcdSugg' },
        { key: 3, value: 'zAbcdSugg' }
      ]
      const { container } = render(
        <Autocomplete
          data={sampleData}
          filterType="custom"
          onInputChange={mockHandleInputChange}
          loading={loading}
          items={items}
        />
      )

      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)
      const options = container.querySelectorAll('div[role="option"]')

      expect(options.length).toBe(2)
      expect(options[0].textContent).toBe('AbcdSugg')
      expect(options[1].textContent).toBe('zAbcdSugg')
    })

    test('With selected item', () => {
      const { container } = render(
        <Autocomplete
          data={sampleData}
          filterType="contains"
          selectedItem={{ value: 'Abcd' }}
        />
      )

      // Set the first query search string
      const input = container.querySelector('input')
      input.value = 'Ab'
      fireEvent.change(input)

      let options = container.querySelectorAll('div[role="option"]')
      expect(options[0].getAttribute('style')).toContain('font-weight: 400;')
      expect(options[1].getAttribute('style')).toContain('font-weight: 400;')

      // Select the second item
      fireEvent.click(options[1])

      // Do the search again
      input.value = 'Abc'
      fireEvent.change(input)

      options = container.querySelectorAll('div[role="option"]')
      expect(options[0].getAttribute('style')).toContain('font-weight: 400;')
      expect(options[1].getAttribute('style')).toContain('font-weight: 500;')
    })
  })
})
