import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { addReadme } from 'storybook-readme'

import newTheme from './new-theme'

addParameters({
  options: {
    name: 'Titus',
    theme: newTheme
  }
})

addDecorator(addReadme)

const storyWrapper = story => <div className="story-wrapper">{story()}</div>
addDecorator(storyWrapper)

import 'styles.css'
