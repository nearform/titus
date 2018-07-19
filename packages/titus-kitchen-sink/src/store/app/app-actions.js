import * as constants from './app-constants'
import authProvider from '../../lib/auth-provider'

export const updateAppConfig = (data) => ({ type: constants.UPDATE_APP_CONFIG, data })
export const logIn = (data) => ({ type: constants.LOG_IN, data })
export const logOut = (data) => ({ type: constants.LOG_OUT, data })

export const submitLogin = (data) => async (dispatch) => {
  authProvider.login(data)
    .then(
      user => dispatch(logIn(user)),
      err => {
        // here we might want to call something like: dispatch(authError(err))
        console.warn(err)
      }
    )
}

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
