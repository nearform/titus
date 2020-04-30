import initStoryshots from '@storybook/addon-storyshots'
import { puppeteerTest } from '@storybook/addon-storyshots-puppeteer'

initStoryshots({
  suite: 'Puppeteer storyshots',
  test: puppeteerTest({
    storybookUrl:
      process.env.CI === 'true'
        ? `file://${process.cwd()}/storybook-static`
        : 'http://localhost:9009'
  })
})
