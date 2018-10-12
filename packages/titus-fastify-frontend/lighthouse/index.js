const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const handler = require('serve-handler')
const http = require('http')
const fs = require('fs')

const PORT = 3001

const server = http.createServer((request, response) => {
  return handler(request, response, { public: 'build', renderSingl: true })
})

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port
      return lighthouse(url, opts, config).then(results => {
        return chrome.kill().then(() => results)
      })
    })
}

const opts = {
  chromeFlags: [],
  output: 'html'
}

server.listen(PORT, async () => {
  const results = await launchChromeAndRunLighthouse(
    `http://localhost:${PORT}`,
    opts
  )

  fs.writeFileSync('./lighthouse-report.html', results.report)

  server.close()
})
