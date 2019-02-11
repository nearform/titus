import React from 'react'
import { storiesOf } from '@storybook/react'
import Auth0 from './login'

storiesOf('Auth0', module)
  .add('default', () => <Auth0 />)
  .add('authenticated', () => <Auth0 auth0={{ isAuthenticated: true }} />)
