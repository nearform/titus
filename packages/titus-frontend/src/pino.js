import pino from 'pino'
const { REACT_APP_API_PATH } = process.env
const config = {
  browser: {
    asObject: true
  }
}

if (REACT_APP_API_PATH) {
  config.browser.transmit = {
    level: 'info',
    send: async (level, logEvent) => {
      const msg = logEvent.messages[0]

      const headers = {
        'Access-Control-Allow-Origin': '*',
        type: 'application/json'
      }
      let blob = new Blob([JSON.stringify({ msg, level })], headers)

      navigator.sendBeacon(`${REACT_APP_API_PATH}/log`, blob)
    }
  }
}

const logger = pino(config)

export const log = msg => logger.info(msg)
export default logger
