import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

const getMatchOptions = ({ context: { kind, story }, url }) => {
  return {
    failureThreshold: 0.01,
    failureThresholdType: 'percent'
  }
}

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
