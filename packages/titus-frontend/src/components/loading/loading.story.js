import React from 'react'
import { storiesOf } from '@storybook/react'
import Loading from '.'

storiesOf('Loading', module).add('default', () => <Loading />, {
  info: {
    text: '## Loading spinner'
  }
})
