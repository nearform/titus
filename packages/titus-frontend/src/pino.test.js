import { log } from './pino'

jest.mock('pino', () => a => {
  if (a.browser && a.browser.transmit) {
    a.browser.transmit.send(0, { messages: ['msg'] })
  }

  return {
    info: () => {}
  }
})

describe('Common file', () => {
  test('should trigger pino', () => {
    log('test message')

    expect(global.navigator.sendBeacon.mock.calls.length).toBe(1)
  })
})
