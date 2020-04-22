import React from 'react'
import { storiesOf } from '@storybook/react'
import Form from './form'

storiesOf('AWS Cognito form', module).add(
  'default',
  () => <Form login={() => {}} />,
  {
    info: {
      text: '## AWS Cognito Form'
    }
  }
)
