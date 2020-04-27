'use strict'

const fs = require('fs')
const path = require('path')
const pino = require('pino')({
  prettyPrint: true,
  colorize: true,
})
const {execSync} = require('child_process')

let packages;

try {
  const output = execSync('npx lerna ls --all --json')
  packages = JSON.parse(output.toString()).map(packageItem => `../packages/${packageItem.name}`)
} catch (error) {
  console.info('No packages found')
  process.exit(0)
}

function cleanEnvs() {
  for (const pathDir of packages) {
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    fs.unlink(env, err => {
      err
        ? pino.warn(`No env file on ${pathDir}`)
        : pino.info(`Removed env on ${pathDir}`)
    })
  }
}


function createEnvs() {
  for (const pathDir of packages) {
    const sample = path.resolve(__dirname, `${pathDir}/.env.sample`)
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    if (fs.existsSync(env)) {
      pino.warn(`File on ${pathDir} already exist`)
    } else {
      fs.copyFileSync(sample, env, fs.constants.COPYFILE_EXCL)
      pino.info(`Created env on ${pathDir}`)
    }
  }
}

module.exports = {
  pino,
  cleanEnvs,
  createEnvs,
}

