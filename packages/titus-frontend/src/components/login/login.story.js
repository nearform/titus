import React from 'react'
import { storiesOf } from '@storybook/react'
import Login from './'

storiesOf('Login', module).add('default', () => <Login />, {
  notes: {
    markdown: `
      ## Login page

      This is what the default login page looks like.
    `
  }
})
