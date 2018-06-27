import { updateAppConfig } from './app-actions'
import * as constants from './app-constants'

describe('updateAppConfig action', () => {
  it('should create an action to update the app config', () => {
    const data = {}
    const expectedAction = {
      type: constants.UPDATE_APP_CONFIG,
      data
    }
    expect(updateAppConfig(data)).toEqual(expectedAction)
  })
})
