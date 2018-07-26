import React from 'react'
import { mount } from 'enzyme'

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

  describe('rendering', () => {
    test('With required props it should render correctly', () => {
      const wrapper = mount(
        <MaterialWizard props={props} events={events} state={state} />
      )
      expect(
        wrapper
          .find('h1')
          .first()
          .text()
      ).toBe('Wizard Title')

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Step 1 Description')

      expect(wrapper.find('h2').text()).toBe('Wizard Finished Message')
      expect(wrapper.find('#mock-step-1').length).toBe(1)
      expect(wrapper.find('#mock-step-2').length).toBe(1)
      expect(wrapper.find('div > div div p').text()).toBe('Required')
      expect(
        wrapper
          .find('button')
          .at(0)
          .text()
      ).toBe('Back')
      expect(
        wrapper
          .find('button')
          .at(1)
          .text()
      ).toBe('Next')
    })

    test('The last tab', () => {
      const wrapper = mount(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 1 })}
        />
      )

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Step 2 Description')

      expect(
        wrapper
          .find('button')
          .at(0)
          .text()
      ).toBe('Back')

      expect(
        wrapper
          .find('button')
          .at(1)
          .text()
      ).toBe('Finish')
    })

    test('If the current step is equal the number of steps', () => {
      const wrapper = mount(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 2 })}
        />
      )

      expect(wrapper.find('button').text()).toBe('Reset')
    })

    test('If the current step is bigger than the number of steps', () => {
      const wrapper = mount(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 3 })}
        />
      )
      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('')
    })
  })

  describe('Events', () => {
    test('Next', () => {
      const wrapper = mount(
        <MaterialWizard props={props} events={events} state={state} />
      )

      wrapper
        .find('button')
        .at(1)
        .simulate('click')

      expect(events.next).toHaveBeenCalled()
    })

    test('Back', () => {
      const wrapper = mount(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 1 })}
        />
      )

      wrapper
        .find('button')
        .at(0)
        .simulate('click')

      expect(events.back).toHaveBeenCalled()
    })

    test('Back on the first step should not be called', () => {
      const wrapper = mount(
        <MaterialWizard props={props} events={events} state={state} />
      )

      wrapper
        .find('button')
        .at(0)
        .simulate('click')

      expect(events.back).not.toHaveBeenCalled()
    })

    test('Back on a finished wizard should not be called', () => {
      const wrapper = mount(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 1, finished: true })}
        />
      )

      wrapper
        .find('button')
        .at(0)
        .simulate('click')

      expect(events.back).not.toHaveBeenCalled()
    })

    test('Reset', () => {
      const wrapper = mount(
        <MaterialWizard
          props={props}
          events={events}
          state={Object.assign({}, state, { stepIndex: 2 })}
        />
      )

      wrapper
        .find('button')
        .at(0)
        .simulate('click')

      expect(events.reset).toHaveBeenCalled()
    })
  })
})
