import React from 'react'
import { storiesOf } from '@storybook/react'
import Form from './form'

storiesOf('In Memory form', module).add(
  'default',
  () => <Form login={() => {}} />,
  {
    info: {
      text: '## In Memory Form'
    }
  }
)
