import React from 'react'
import { storiesOf } from '@storybook/react'
import Form from './form'

const authentication = {
  parseHash: () =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 1000)
    )
}

storiesOf('Auth0 form', module).add(
  'default',
  () => <Form login={() => {}} authentication={authentication} />,
  {
    info: {
      text: `
        ## Auth0 Form
        
        This form will be used:
          * when user is not authenticated yet, url is /login
          * when Auth0 invokes it as a callback, with authentication details. Url is /login?#access_token=...
        `
    }
  }
)
