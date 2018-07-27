import React, { Component } from 'react'
import { mount } from 'enzyme'

import Wizard from '../../src/wizard/wizard'

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

describe('Wizard', () => {
  let steps = {}

  beforeEach(() => {
    steps = [
      <SampleCard id={1} key={1} title='Step 1' description='Description 1' />,
      <SampleCard
        id={2}
        key={2}
        title='Step 2'
        description='Description 2'
        required
        requiredMessage='Step 2 Required'
        stepsDataRequired
      />,
      <SampleCard
        id={3}
        key={3}
        title='Step 3'
        description='Description 3'
        required
        stepsDataRequired
      />,
      <SampleCard
        id={4}
        key={4}
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
      <Wizard
        title='Wizard Title'
        finishedMessage='Finished Message'
        defaultRequiredMessage='Default Message'
      >
        {steps.map(step => step)}
      </Wizard>
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
})
