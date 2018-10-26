import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { countries } from './countries'
import Autocomplete from '../autocomplete'

storiesOf('Autocomplete', module)
  .add('default', () => (
    <div>
      <Autocomplete
        placeholder="I am a placeholder"
        onChange={action('onChange')}
        data={countries}
      />
    </div>
  ))
  .add('required', () => (
    <div>
      <Autocomplete
        placeholder="I am required"
        onChange={action('onChange')}
        data={countries}
        required
      />
    </div>
  ))
  .add('disabled', () => (
    <div>
      <Autocomplete
        placeholder="I am disabled"
        disabled
      />
    </div>
  ))
  .add('read only', () => (
    <div>
      <Autocomplete
        placeholder="I am read only"
        readOnly
      />
    </div>
  ))
  .add('with error', () => (
    <div>
      <Autocomplete
        placeholder="I am invalid"
        onChange={action('onChange')}
        data={countries}
        error
      />
    </div>
  ))
  .add('with label', () => (
    <div>
      <Autocomplete
        label="I am a label"
        id="with-label"
        onChange={action('onChange')}
        data={countries}
      />
    </div>
  ))
  .add('with helper text', () => (
    <div>
      <Autocomplete
        placeholder="I am a placeholder"
        id="with-label"
        onChange={action('onChange')}
        data={countries}
        helperText="I'm some text"
      />
    </div>
  ))
