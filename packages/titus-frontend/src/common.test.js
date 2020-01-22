import { log } from './common'

describe('Common file', () => {
  test('should trigger console.log', () => {
    process.env = {}

    global.console.log = jest.fn()
    log('test message')

    expect(global.console.log.mock.calls.length).toBe(1)
  })

  test('should trigger fetch', () => {
    process.env.REACT_APP_API_PATH = 'url/path'

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({}))
    log('message')

    expect(window.fetch.mock.calls.length).toBe(1)
  })

  test('should trigger fetch and return error', () => {
    process.env.REACT_APP_API_PATH = 'url/path'
    window.fetch = jest.fn().mockImplementation(() => Promise.reject('error'))
    log('message')

    expect(window.fetch.mock.calls.length).toBe(1)
  })
})
