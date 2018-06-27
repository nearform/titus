import reducer from './app-reducer'
import * as constants from './app-constants'

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      config: {}
    })
  })

  it('should handle app config updates', () => {
    expect(
      reducer(
        {},
        {
          type: constants.UPDATE_APP_CONFIG,
          data: {
            configItem: 'test'
          }
        }
      )
    ).toEqual({
      config: {
        configItem: 'test'
      }
    })
  })
})
