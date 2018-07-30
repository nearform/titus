import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import MaterialWizard from '../../../src/wizard/material/material-wizard'

describe('Material Wizard', () => {
  let props = {}
  let events = {}
  let state = {}

  beforeEach(() => {
    props = {
      title: 'Wizard Title',
      finishedMessage: 'Wizard Finished Message'
    }
    events = {
      next: jest.fn(),
      back: jest.fn(),
      reset: jest.fn()
    }
    state = {
      steps: [<div id='mock-step-1' />, <div id='mock-step-2' />],
      numSteps: 2,
      stepIndex: 0,
      stepsInfo: [
        { id: 1, title: 'Step 1', description: 'Step 1 Description' },
        { id: 2, title: 'Step 2', description: 'Step 2 Description' }
      ],
      requiredMessage: 'Required',
      finished: false
    }
  })

  it('should be defined', () => {
    expect(MaterialWizard).toBeDefined()
  })

  describe('rendering', () => {
    test('With required props it should render correctly', () => {
      const { container, getByTestId } = render(
        <MaterialWizard props={props} events={events} state={state} />
      )

      expect(getByTestId('wizard-title').textContent).toBe('Wizard Title')
      expect(getByTestId('wizard-description').textContent).toBe('Step 1 Description')

      expect(container.querySelector('h2').textContent).toBe(
        'Wizard Finished Message'
      )
      expect(container.querySelector('#mock-step-1')).not.toBeNull()
      expect(container.querySelector('#mock-step-2')).not.toBeNull()
      expect(container.querySelector('div > div div p').textContent).toBe(
        'Required'
      )
      expect(getByTestId('wizard-control-bar-back').textContent).toBe('Back')
      expect(getByTestId('wizard-control-bar-next').textContent).toBe('Next')
    })

    test('The last tab', () => {
      const { getByTestId } = render(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 1 })}
        />
      )

      expect(getByTestId('wizard-description').textContent).toBe('Step 2 Description')
      expect(getByTestId('wizard-control-bar-back').textContent).toBe('Back')
      expect(getByTestId('wizard-control-bar-next').textContent).toBe('Finish')
    })

    test('If the current step is equal the number of steps', () => {
      const { getByTestId } = render(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 2 })}
        />
      )

      expect(getByTestId('wizard-control-bar-reset').textContent).toBe('Reset')
    })

    test('If the current step is bigger than the number of steps', () => {
      const { getByTestId } = render(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 3 })}
        />
      )
      expect(getByTestId('wizard-description').textContent).toBe('')
    })
  })

  describe('Events', () => {
    test('Next', () => {
      const { getByTestId } = render(
        <MaterialWizard props={props} events={events} state={state} />
      )

      fireEvent.click(getByTestId('wizard-control-bar-next'))

      expect(events.next).toHaveBeenCalled()
    })

    test('Back', () => {
      const { getByTestId } = render(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 1 })}
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-back'))

      expect(events.back).toHaveBeenCalled()
    })

    test('Back on the first step should not be called', () => {
      const { getByTestId } = render(
        <MaterialWizard props={props} events={events} state={state} />
      )

      fireEvent.click(getByTestId('wizard-control-bar-back'))

      expect(events.back).not.toHaveBeenCalled()
    })

    test('Back on a finished wizard should not be called', () => {
      const { getByTestId } = render(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 1, finished: true })}
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-back'))

      expect(events.back).not.toHaveBeenCalled()
    })

    test('Reset', () => {
      const { getByTestId } = render(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 2 })}
        />
      )

      fireEvent.click(getByTestId('wizard-control-bar-reset'))

      expect(events.reset).toHaveBeenCalled()
    })
  })
})
