import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { withInfo } from '@storybook/addon-info'
import { checkA11y } from '@storybook/addon-a11y'

import theme from './theme'

addDecorator(
  withOptions({
    name: 'Titus',
    theme
  })
)

addDecorator(
  withInfo({
    header: false,
    inline: true,
    source: true
  })
)

addDecorator(checkA11y)

const storyWrapper = story => <div className="story-wrapper">{story()}</div>
addDecorator(storyWrapper)

import '../src/styles.css'

const req = require.context('../src/', true, /.story.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
