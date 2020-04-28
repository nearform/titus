import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { checkA11y } from '@storybook/addon-a11y'
import { addReadme } from 'storybook-readme'

import newTheme from './new-theme'

addParameters({
  options: {
    name: 'Titus',
    theme: newTheme
  }
})

addDecorator(addReadme)
addDecorator(checkA11y)

const storyWrapper = story => <div className="story-wrapper">{story()}</div>
addDecorator(storyWrapper)

import '../src/styles.css'
