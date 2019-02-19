const startServer = require('./lib/server')

const main = async () => {
  const server = await startServer()

  process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(1)
  })

  process.on('SIGINT', () => {
    server.stop({ timeout: 10e3 }).then(err => {
      process.exit(err ? 1 : 0)
    })
  })
}

main()
