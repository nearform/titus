'use strict'

const {promisify} = require('util')
const fs = require('fs')
const path = require('path')
const {execSync} = require('child_process')
const chalk = require("chalk")

const warning = chalk.keyword('yellow')
const info = chalk.keyword('green')

const unlink = promisify(fs.unlink)
const access = promisify(fs.access)
const copyFile = promisify(fs.copyFile)

let packages;

try {
  const output = execSync('npx lerna ls --all --json')
  packages = JSON.parse(output.toString()).map(packageItem => `../packages/${packageItem.name}`)
} catch (error) {
  console.log(warning('No packages found'))
  process.exit(0)
}

async function cleanEnv() {
  for (const pathDir of packages) {
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    try {
      await unlink(env)
      console.log(info(`Removed env on ${pathDir}`))
    } catch (err) {
      console.log(warning(`No env file on ${pathDir}`))
    }
  }
}


async function createEnv() {
  for (const pathDir of packages) {
    const sample = path.resolve(__dirname, `${pathDir}/.env.sample`)
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    try {
      await access(env)
      console.log(warning(`File on ${pathDir} already exist`))
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        await copyFile(sample, env)
        console.log(info(`Created env on ${pathDir}`))
      }
    }
  }
}

module.exports = {
  cleanEnv,
  createEnv,
}

