import React from 'react'
import PropTypes from 'prop-types'
import 'jest-dom/extend-expect'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  within
} from 'react-testing-library'
import { MockedProvider } from 'react-apollo/test-utils'
import { TableRow } from '../'
import withContext from '../../../../test/with-context'
import { loadFoodData, updateFood } from '../lib/data'

global.SVGElement = Element

const apolloMocks = [
  {
    request: {
      query: loadFoodData
    },
    result: {
      data: {
        allFood: [],
        foodGroups: [
          { id: 'ME_GRUB', name: 'Pirate Food' },
          { id: 'ME_GROG', name: 'Pirate Beverages' }
        ]
      }
    }
  },
  {
    request: {
      query: updateFood,
      variables: {
        food: {
          id: 1,
          name: 'Sea Biscuits',
          foodGroupId: 'ME_GRUB',
          foodGroup: 'Pirate Food'
        }
      }
    },
    result: {
      data: {
        whatever: ''
      }
    }
  }
]

const wait = (timeout = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout))

afterEach(cleanup)

describe('<TableRow />', () => {
  const Context = ({ children }) =>
    withContext(
      { table: {} },
      { table: PropTypes.any },
      <table>
        <tbody>{children}</tbody>
      </table>
    )

  const rowData = {
    id: 1,
    name: 'Rum',
    foodGroup: 'Pirate Beverages',
    foodGroupId: 'ME_GROG'
  }

  it('renders a row correctly', () => {
    const { queryByText, getByLabelText, queryByLabelText } = render(
      <Context>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          <TableRow row={rowData} />
        </MockedProvider>
      </Context>
    )
    const nameCell = getByLabelText('Food Name')
    expect(nameCell).toHaveTextContent('Rum')
    const foodGroupCell = getByLabelText('Food Group')
    expect(foodGroupCell).toHaveTextContent('Pirate Beverages')

    expect(queryByText('ME_GROG')).toBeNull() // Don't render foodGroupId anywhere
    expect(getByLabelText('Edit')).toBeTruthy()
    expect(queryByLabelText('Cancel')).toBeNull()
    expect(queryByLabelText('Save')).toBeNull()
  })

  it('enables edit mode when button is clicked, and reverts when cancel is clicked', async () => {
    const { getByLabelText, getByText } = render(
      <Context>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          <TableRow row={rowData} />
        </MockedProvider>
      </Context>
    )

    // Verify all cells are rendered
    let nameCell = getByLabelText('Food Name')
    expect(nameCell).toHaveTextContent('Rum')
    let foodGroupCell = getByLabelText('Food Group')
    expect(foodGroupCell).toHaveTextContent('Pirate Beverages')

    // Food name should be text, not an input element
    expect(nameCell.querySelector('input')).toBeNull()

    // Food group should be text, not an input element
    expect(foodGroupCell.querySelector('input')).toBeNull()

    // Click to enter edit mode
    const editButton = getByLabelText('Edit')
    expect(editButton).toBeTruthy()
    fireEvent.click(editButton)

    // Wait for ui to update
    const saveButton = await waitForElement(() => {
      return getByLabelText('Save')
    })

    // Wait for apollo query to return results
    await wait()

    // Verify presence of cancel and save buttons
    expect(saveButton).toBeTruthy()
    const cancelButton = getByLabelText('Cancel')
    expect(cancelButton).toBeTruthy()

    // Food name should now be a text input element containing current value
    nameCell = getByLabelText('Food Name')
    const nameInput = nameCell.querySelector('input')
    expect(nameInput).toBeTruthy()
    expect(nameInput).toHaveAttribute('value', 'Rum')

    // Food group should be an input element (for the id), and text to render the food group name
    foodGroupCell = getByLabelText('Food Group')
    const foodGroupInput = foodGroupCell.querySelector('input')
    expect(foodGroupInput).toHaveAttribute('value', 'ME_GROG')
    expect(foodGroupCell).toHaveTextContent('Pirate Beverages')

    // Change food name input value
    nameInput.value = 'Sea Biscuits'
    fireEvent.change(nameInput)
    // Verify updated value
    expect(nameInput).toHaveAttribute('value', 'Sea Biscuits')

    // Change food group input value
    const foodGroupSelect = within(foodGroupCell).getByText('Pirate Beverages')
    fireEvent.click(foodGroupSelect) // Click to render menu
    const newSelection = await waitForElement(() => {
      return getByText('Pirate Food')
    })
    fireEvent.click(newSelection) // Click to select new food group 'Pirate Food'
    // Verify updated value
    expect(foodGroupSelect).toHaveTextContent('Pirate Food')
    expect(foodGroupInput).toHaveAttribute('value', 'ME_GRUB')

    // Cancel edit - all should revert
    fireEvent.click(cancelButton)

    // Food name should be text, not an text input element, and have original content
    nameCell = getByLabelText('Food Name')
    expect(nameCell).toHaveTextContent('Rum')
    expect(nameCell.querySelector('input')).toBeNull()

    // Food group should be text, not a select input element, and have original content
    foodGroupCell = getByLabelText('Food Group')
    expect(foodGroupCell).toHaveTextContent('Pirate Beverages')
    expect(foodGroupCell.querySelector('input')).toBeNull()
  })

  it('enables edit mode when button is clicked, and save changes when save is clicked', async () => {
    const { getByLabelText, getByText } = render(
      <Context>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          <TableRow row={rowData} />
        </MockedProvider>
      </Context>
    )

    // Click to enter edit mode
    const editButton = getByLabelText('Edit')
    fireEvent.click(editButton)

    // Wait for ui to update
    const saveButton = await waitForElement(() => {
      return getByLabelText('Save')
    })

    await wait(0)

    const nameCell = getByLabelText('Food Name')
    const foodGroupCell = getByLabelText('Food Group')

    // Change food name input value
    const nameInput = nameCell.querySelector('input')
    nameInput.value = 'Sea Biscuits'
    fireEvent.change(nameInput)
    // Verify updated value
    expect(nameInput).toHaveAttribute('value', 'Sea Biscuits')

    // Change food group input value
    const foodGroupInput = foodGroupCell.querySelector('input')
    const foodGroupSelect = within(foodGroupCell).getByText('Pirate Beverages')
    fireEvent.click(foodGroupSelect) // Click to render menu
    const newSelection = await waitForElement(() => {
      return getByText('Pirate Food')
    })
    fireEvent.click(newSelection) // Click to select new food group 'Pirate Food'
    // Verify updated value
    expect(foodGroupSelect).toHaveTextContent('Pirate Food')
    expect(foodGroupInput).toHaveAttribute('value', 'ME_GRUB')

    // Save changes
    fireEvent.click(saveButton)

    await wait(0)
  })
})
