import * as constants from './app-constants'

export const updateAppConfig = (data) => ({ type: constants.UPDATE_APP_CONFIG, data })
export const logIn = (data) => ({ type: constants.LOG_IN, data })
export const logOut = (data) => ({ type: constants.LOG_OUT, data })

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
