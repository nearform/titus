import pino, { log } from './pino'
let warnMessage
let infoMessage

jest.mock('pino', params => {
  return params => {
    if (params.browser && params.browser.transmit) {
      params.browser.transmit.send(0, { messages: ['msg'] })
    }

    return {
      info: msg => {
        infoMessage = msg
      },
      warn: msg => {
        warnMessage = msg
      }
    }
  }
})

describe('Pino file', () => {
  test('should trigger pino log function', () => {
    log('log message')

    // expect(global.navigator.sendBeacon.mock.calls.length).toBe(1)
    expect(infoMessage).toBe('log message')
  })

  test('should trigger pino default with warn', () => {
    pino.warn('warn message')

    expect(warnMessage).toBe('warn message')
  })
})
