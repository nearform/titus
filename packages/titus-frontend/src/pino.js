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
        type: 'application/json'
      }
      let blob = new Blob([JSON.stringify({ msg })], headers)

      navigator.sendBeacon(`${REACT_APP_API_PATH}/log`, blob)
    }
  }
}

const logger = pino(config)
const info = msg => logger.info(msg)

export default info
