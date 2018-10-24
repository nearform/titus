import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Typography from '@material-ui/core/Typography';

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
  .add('with helper text', () => (
    <Autocomplete
      placeholder="I am a placeholder"
      onChange={action('onChange')}
      data={countries}
    >
      <Typography variant="caption">Start typing to see all options</Typography>
    </Autocomplete>
  ))
