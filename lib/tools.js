'use strict'

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const chalk = require('chalk')

const warning = chalk.keyword('yellow')
const info = chalk.keyword('green')

let packages

try {
  const output = execSync('npx lerna ls --all --json')
  packages = JSON.parse(output.toString()).map(
    packageItem => `../packages/${packageItem.name}`
  )
} catch (error) {
  console.log(warning('No packages found'))
  process.exit(0)
}

function cleanEnv() {
  for (const pathDir of packages) {
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    if (!fs.existsSync(env)) {
      continue
    }

    try {
      fs.unlinkSync(env)
      console.log(info(`Removed env on ${pathDir}`))
    } catch (err) {
      console.log(warning(`No env file on ${pathDir}`))
    }
  }
}

function createEnv() {
  for (const pathDir of packages) {
    const sample = path.resolve(__dirname, `${pathDir}/.env.sample`)
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    if (!fs.existsSync(sample)) {
      continue
    }

    try {
      fs.accessSync(env)
      console.log(warning(`File on ${pathDir} already exist`))
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        fs.copyFileSync(sample, env)
        console.log(info(`Created env on ${pathDir}`))
      }
    }
  }
}

module.exports = {
  cleanEnv,
  createEnv
}
