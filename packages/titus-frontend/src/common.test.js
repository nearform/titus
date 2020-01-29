import { log } from './common'

jest.mock('./pino', () => jest.fn())

describe('Common file', () => {
  test('should trigger console.log', () => {
    process.env = {}
    log('test message')
  })

  test('should trigger pino', () => {
    process.env.REACT_APP_API_PATH = 'url/path'
    log('message')
  })
})
