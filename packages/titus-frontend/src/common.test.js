import { log } from './common'
import * as constants from './config'

describe('Common file', () => {
  test('should trigger console.log', () => {
    constants.API_PATH = undefined

    global.console.log = jest.fn()
    log('test message')

    expect(global.console.log.mock.calls.length).toBe(1)
  })

  test('should trigger fetch', () => {
    constants.API_PATH = 'url/path'

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({}))
    log('message')

    expect(window.fetch.mock.calls.length).toBe(1)
  })

  test('should trigger fetch and return error', () => {
    constants.API_PATH = 'url/path'

    window.fetch = jest.fn().mockImplementation(() => Promise.reject('error'))
    log('message')

    expect(window.fetch.mock.calls.length).toBe(1)
  })
})
