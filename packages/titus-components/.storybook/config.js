import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  name: 'titus-components'
})

const req = require.context('../src/', true, /.story.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
