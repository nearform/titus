import pino from './pino'

export const log = async msg => {
  const { REACT_APP_API_PATH } = process.env

  if (REACT_APP_API_PATH) {
    pino.info(msg)
  } else {
    console.log(msg)
  }
}
