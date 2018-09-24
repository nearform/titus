import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import TextField from '@material-ui/core/TextField'

import Wizard from '../wizard'

export function SimpleStep({
  handleSatisfied,
  stepIndex,
  handleDataChanged,
  required,
  data: { value }
}) {
  const formRef = React.createRef()

  const onChange = ({ target: { value } }) => {
    handleSatisfied(stepIndex, formRef.current.checkValidity())
    handleDataChanged(stepIndex, { value })
  }

  return (
    <form ref={formRef}>
      <TextField
        label="Value"
        required={required}
        value={value || ''}
        onChange={onChange}
      />
    </form>
  )
}

export function FinalStep({ stepsData, stepsInfo }) {
  return (
    <ul>
      {stepsInfo.slice(0, -1).map(({ title, description }, index) => (
        <li key={index}>
          {index + 1}. {title} - {description}:{' '}
          <code>{JSON.stringify(stepsData[index])}</code>
        </li>
      ))}
    </ul>
  )
}

const stories = storiesOf('Wizard', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
  <Wizard
    onFinish={action('wizard finish')}
    title={text('Wizard Title', 'Wizard Story')}
    finishedMessage={text('Wizard finished message', 'Wizard complete')}
    defaultRequiredMessage={text(
      'Default required message',
      'A default required message'
    )}
  >
    <SimpleStep
      id="step1"
      title="Step 1"
      description="A simple, non required step"
    />
    <SimpleStep
      id="step2"
      title="Step 2"
      description="A simple, required step"
      required
      requiredMessage="You need to enter a value to proceed further"
    />
    <SimpleStep
      id="step3"
      title="Step 3"
      description="A required step with no required message will fallback to the default"
      required
    />
    <FinalStep
      id="step4"
      title="Final step"
      description="The last step can summarize the progress in the wizard"
      stepsDataRequired
    />
  </Wizard>
))
