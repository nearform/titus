import * as constants from './app-constants'

export const updateAppConfig = (data) => ({ type: constants.UPDATE_APP_CONFIG, data })

/*
An async example
export const fetchAppConfig = () =>
  async (dispatch) => {
    try {
      const config = await fetchConfigFromApi()
      dispatch(updateAppConfig(config))
    } catch (error) {
      // handle any errors
    }
  }
*/
