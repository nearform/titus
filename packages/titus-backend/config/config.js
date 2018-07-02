module.exports = {
  hapi: {
    port: 5000
  },
  logger: {
    pino: {
      prettyPrint: process.env.NODE_ENV !== 'production'
    }
  },
  pg: {
    max: 20, // set pool max size to 20
    min: 4, // set min pool size to 4
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 10000 // return an error after 1 second if connection could not be established
  }
}
