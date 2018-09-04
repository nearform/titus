import React, { Component } from 'react'
import { render, fireEvent } from 'react-testing-library'

import MaterialWizard from '../../src/wizard/material/material-wizard'
import HeadlessWizard from '../../src/wizard/headless-wizard'

class SampleCard extends Component {
  render() {
    let {
      handleSatisfied,
      handleDataChanged,
      stepIndex,
      id,
      stepsData
    } = this.props
    return (
      <div>
        <button
          data-testid={`card-${id}-satisfy`}
          onClick={() => {
            handleSatisfied(stepIndex, true)
          }}
        />
        <button
          data-testid={`card-${id}-data-changed`}
          onClick={() => handleDataChanged(stepIndex, { id, foo: 'bar' })}
        />
        <div data-testid={`card-${id}-steps-data`}>
          {JSON.stringify(stepsData[id - 1])}
        </div>
      </div>
    )
  }
}

describe('Headless wizard', () => {
  let steps = {}

  beforeEach(() => {
    steps = [
      <SampleCard id={1} title="Step 1" description="Description 1" />,
      <SampleCard
        id={2}
        title="Step 2"
        description="Description 2"
        required
        requiredMessage="Step 2 Required"
        stepsDataRequired
      />,
      <SampleCard
        id={3}
        title="Step 3"
        description="Description 3"
        required
        stepsDataRequired
      />,
      <SampleCard
        id={4}
        title="Step 4"
        description="Description 4"
        required
        requiredMessage="Step 4 Required"
        stepsDataRequired
      />
    ]
  })

  it('should be defined', () => {
    expect(HeadlessWizard).toBeDefined()
  })

  test('Default initialization', () => {
    const { getByTestId } = render(
      <HeadlessWizard
        steps={steps}
        children={MaterialWizard}
        title="Wizard Title"
      />
    )

    expect(getByTestId('wizard-title').textContent).toBe('Wizard Title')
    expect(getByTestId('wizard-description').textContent).toBe('Description 1')
  })

  describe('Navigation', () => {
    test('Next', async () => {
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )
      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 2'
      )
    })

    test("Next won't proceed if is required", () => {
      const { container, getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 2'
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 2'
      )

      expect(container.querySelector('p').textContent).toBe('Step 2 Required')
    })

    test('Next proceed if is required and satisfied', () => {
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))
      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 2'
      )

      fireEvent.click(getByTestId('card-2-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 3'
      )
    })

    test('The default message is used if the required is not defined', () => {
      const { container, getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))
      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 2'
      )

      fireEvent.click(getByTestId('card-2-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(container.querySelector('p').textContent).toBe(
        'Data required to continue'
      )
    })

    test('In the last card set finished to true', () => {
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-2-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-3-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-4-satisfy'))
      expect(
        getByTestId('wizard-finished-message').getAttribute('class')
      ).toContain('MaterialWizard-hide')
    })

    test('In the last card set finished to true and call if defined the onFinish function', () => {
      const mockOnFinish = jest.fn()
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
          onFinish={mockOnFinish}
        />
      )
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-2-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-3-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-4-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(mockOnFinish).toHaveBeenCalled()
    })
  })

  describe('back', () => {
    test('The click bring back to the previous card', () => {
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('wizard-control-bar-back'))

      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 1'
      )
    })
  })

  describe('reset', () => {
    test('Click on reset should return to the initial state', () => {
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-2-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-3-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('card-4-satisfy'))
      fireEvent.click(getByTestId('wizard-control-bar-next'))
      fireEvent.click(getByTestId('wizard-control-bar-reset'))

      expect(getByTestId('wizard-description').textContent).toBe(
        'Description 1'
      )
    })
  })

  describe('HandleDataChanged', () => {
    test('The state is updated', () => {
      const { getByTestId } = render(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title="Wizard Title"
        />
      )

      fireEvent.click(getByTestId('card-2-data-changed'))
      expect(getByTestId('card-2-steps-data').textContent).toBe(
        '{"id":2,"foo":"bar"}'
      )
    })
  })
})
