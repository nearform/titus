import { log } from './common'

jest.mock('pino', () => jest.fn())

describe('Common file', () => {
  test('should trigger console.log', () => {
    process.env = {}
    log('test message')
  })

  test('should trigger sendBeacon', () => {
    process.env.REACT_APP_API_PATH = 'url/path'
    global.navigator.sendBeacon = jest.fn().mockImplementation(() => true)
    log('message')

    expect(global.navigator.sendBeacon.mock.calls.length).toBe(1)
  })

  test('should trigger sendBeacon and return false', () => {
    process.env.REACT_APP_API_PATH = 'url/path'
    global.navigator.sendBeacon = jest.fn().mockImplementation(() => false)
    log('message')

    expect(global.navigator.sendBeacon.mock.calls.length).toBe(1)
  })
})
