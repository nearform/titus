import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Login } from './login'

storiesOf('Login', module).add('default', () => (
  <Login submitLogin={action('submit')} />
))
