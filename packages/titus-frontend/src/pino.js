import pino from 'pino'
import config from './config'

const pinoConfig = {
  browser: {
    asObject: true
  }
}

if (config.serverUrl) {
  pinoConfig.browser.transmit = {
    level: 'info',
    send: async (level, logEvent) => {
      const msg = logEvent.messages[0]

      const headers = {
        'Access-Control-Allow-Origin': '*',
        type: 'application/json'
      }
      let blob = new Blob([JSON.stringify({ msg, level })], headers)

      navigator.sendBeacon(`${config.serverUrl}/log`, blob)
    }
  }
}

const logger = pino(pinoConfig)

export const log = msg => logger.info(msg)
export default logger
