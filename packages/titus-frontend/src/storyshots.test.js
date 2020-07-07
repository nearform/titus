import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import { MATCH_OPTIONS } from './constants'

const getMatchOptions = () => MATCH_OPTIONS

initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({
    getMatchOptions,
    storybookUrl:
      process.env.CI === 'true'
        ? `file://${process.cwd()}/storybook-static`
        : 'http://localhost:9009'
  })
})
