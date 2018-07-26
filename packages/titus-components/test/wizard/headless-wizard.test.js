import React, { Component } from 'react'
import { mount } from 'enzyme'
import cloneDeep from 'lodash/cloneDeep'

import MaterialWizard from '../../src/wizard/material/material-wizard'
import HeadlessWizard from '../../src/wizard/headless-wizard'

class SampleCard extends Component {
  render () {
    let { handleSatisfied, handleDataChanged, stepIndex, id } = this.props
    return (
      <div id={`card-${id}`}>
        <button
          onClick={() => {
            handleSatisfied(stepIndex, true)
          }}
        />
        <button
          onClick={() => handleDataChanged(stepIndex, { id, foo: 'bar' })}
        />
      </div>
    )
  }
}

const getControlBar = wrapper =>
  wrapper.findWhere(e => {
    return ((e.length === 1 && e.props().className) || '').startsWith(
      'MaterialWizard-controls'
    )
  })

const getNextButton = wrapper =>
  getControlBar(wrapper)
    .find('button')
    .at(1)

const getPrevButton = wrapper =>
  getControlBar(wrapper)
    .find('button')
    .at(0)

const getResetButton = wrapper =>
  getControlBar(wrapper)
    .find('button')
    .at(0)

const clickOnSatisfyAction = (wrapper, id) =>
  wrapper
    .find(`#card-${id} button`)
    .at(0)
    .simulate('click')

describe('Headless wizard', () => {
  let steps = {}

  beforeEach(() => {
    steps = [
      <SampleCard id={1} title='Step 1' description='Description 1' />,
      <SampleCard
        id={2}
        title='Step 2'
        description='Description 2'
        required
        requiredMessage='Step 2 Required'
        stepsDataRequired
      />,
      <SampleCard
        id={3}
        title='Step 3'
        description='Description 3'
        required
        stepsDataRequired
      />,
      <SampleCard
        id={4}
        title='Step 4'
        description='Description 4'
        required
        requiredMessage='Step 4 Required'
        stepsDataRequired
      />
    ]
  })

  test('Default initialization', () => {
    const wrapper = mount(
      <HeadlessWizard
        steps={steps}
        children={MaterialWizard}
        title='Wizard Title'
      />
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
    ).toBe('Description 1')
  })

  describe('Navigation', () => {
    test('Next', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      getNextButton(wrapper).simulate('click')

      wrapper.update()

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 2')
    })

    test("Next won't proceed if is required", () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 2')

      getNextButton(wrapper).simulate('click')

      wrapper.update()

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 2')

      expect(wrapper.find('p').text()).toBe('Step 2 Required')
    })

    test('Next proceed if is required and satisfied', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 2')

      clickOnSatisfyAction(wrapper, 2)

      wrapper.update()

      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 3')
    })

    test('The default message is used if the required is not defined', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 2')

      clickOnSatisfyAction(wrapper, 2)

      wrapper.update()
      getNextButton(wrapper).simulate('click')
      wrapper.update()

      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(wrapper.find('p').text()).toBe('Data required to continue')
    })

    test('In the last card set finished to true', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 2)
      wrapper.update()
      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 3)
      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 4)
      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(wrapper.state().finished).toBeTruthy()
    })

    test('In the last card set finished to true and call if defined the onFinish function', () => {
      const mockOnFinish = jest.fn()
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
          onFinish={mockOnFinish}
        />
      )

      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 2)
      wrapper.update()
      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 3)
      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 4)
      getNextButton(wrapper).simulate('click')
      wrapper.update()

      expect(wrapper.state().finished).toBeTruthy()

      expect(mockOnFinish).toHaveBeenCalled()
    })
  })

  describe('back', () => {
    test('The click bring back to the previous card', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      getNextButton(wrapper).simulate('click')
      wrapper.update()
      getPrevButton(wrapper).simulate('click')

      expect(
        wrapper
          .find('h1')
          .at(1)
          .text()
      ).toBe('Description 1')
    })
  })

  describe('reset', () => {
    test('Click on reset should return to the initial state', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      const initialState = cloneDeep(wrapper.state())

      getNextButton(wrapper).simulate('click')
      wrapper.update()
      expect(wrapper.state()).not.toEqual(initialState)
      clickOnSatisfyAction(wrapper, 2)
      wrapper.update()
      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 3)
      getNextButton(wrapper).simulate('click')
      wrapper.update()
      clickOnSatisfyAction(wrapper, 4)
      getNextButton(wrapper).simulate('click')
      wrapper.update()

      getResetButton(wrapper).simulate('click')
      wrapper.update()
      expect(wrapper.state()).toEqual(initialState)
    })
  })

  describe('HandleDataChanged', () => {
    test('The state is updated', () => {
      const wrapper = mount(
        <HeadlessWizard
          steps={steps}
          children={MaterialWizard}
          title='Wizard Title'
        />
      )

      wrapper
        .find('#card-1 button')
        .at(1)
        .simulate('click')
      wrapper.update()

      expect(wrapper.state().stepsData[0]).toEqual({ id: 1, foo: 'bar' })
    })
  })
})
