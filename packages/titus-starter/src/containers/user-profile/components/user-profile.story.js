import React from 'react'
import { storiesOf } from '@storybook/react'
import User from './user-profile'

storiesOf('UserProfile', module)
  .add('default avatar', () => {
    const userObj = {
      username: 'Lazy user',
      city: 'New York',
      Dob: '02/03/1980 00:00:00'
    }
    return (<User user={{...userObj}} />)
  })
  .add('custom avatar', () => {
    const userObj = {
      username: 'John',
      city: 'New York',
      Dob: '02/03/1980 00:00:00',
      avatar: 'https://api.adorable.io/avatars/100/alessio@adorable.png'
    }
    return (<User user={{...userObj}} />)
  })
