import pinoLib from 'pino'
const pino = pinoLib({ browser: { asObject: true } })

export const log = async msg => {
  const { REACT_APP_API_PATH } = process.env

  if (REACT_APP_API_PATH) {
    const headers = {
      type: 'application/json'
    }
    let blob = new Blob([JSON.stringify({ msg })], headers)

    const result = navigator.sendBeacon(`${REACT_APP_API_PATH}/log`, blob)

    if (!result) {
      pino.error('Error on log')
    }
  } else {
    pino.info(msg)
  }
}
