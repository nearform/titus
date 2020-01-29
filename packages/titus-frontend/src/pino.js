import pino from 'pino'
const { REACT_APP_API_PATH } = process.env

const logger = pino({
  browser: {
    asObject: true,
    transmit: {
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
})

export default logger
