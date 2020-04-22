import React from 'react'
import { storiesOf } from '@storybook/react'
import Form from './form'

storiesOf('Titus Backend form', module).add(
  'default',
  () => <Form login={() => {}} />,
  {
    info: {
      text: '## Titus Backend Form'
    }
  }
)
