import React from 'react'
import { storiesOf } from '@storybook/react'
import LoginForm from '.'

storiesOf('Login form', module).add(
  'default',
  () => <LoginForm header="Titus login form" />,
  {
    info: {
      text: `
      ## Login Form
      
      This is the form used on the login page. 
      It uses \`formik\` to manage the form which means you can pass it a validation schema and it will do the work for you.
      `
    }
  }
)
