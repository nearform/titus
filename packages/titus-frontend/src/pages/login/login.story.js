import React from 'react'
import { storiesOf } from '@storybook/react'
import Login from '.'
import Auth from '../../components/authentication'
import Authentication, {
  Login as Form
} from '../../components/auth-providers/in-memory'

const authentication = new Authentication()

storiesOf('Login', module).add(
  'default',
  () => (
    <Auth authentication={authentication} component={Form}>
      {() => <Login />}
    </Auth>
  ),
  {
    notes: {
      markdown: `
      ## Login page

      This is what the default login page looks like.
    `
    }
  }
)
