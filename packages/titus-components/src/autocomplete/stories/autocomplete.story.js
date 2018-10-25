import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { countries } from './countries'
import Autocomplete from '../autocomplete'

storiesOf('Autocomplete', module)
  .add('default', () => (
    <Autocomplete
      placeholder="I am a placeholder"
      onChange={action('onChange')}
      data={countries}
    />
  ))