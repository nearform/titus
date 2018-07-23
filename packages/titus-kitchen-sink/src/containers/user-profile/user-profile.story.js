import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { UserProfile } from './user-profile'

storiesOf('UserProfile', module)
  .add('default', () => {
    const userObj = {
      username: 'User'
    }

    return (<UserProfile logOut={action('logOut')} user={{...userObj}} />)
  })
