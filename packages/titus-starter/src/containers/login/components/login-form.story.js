import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Login from './login-form'

storiesOf('LoginForm', module)
  .add('default', () => (
    <Login onSubmit={action('submit')} />
  ))
