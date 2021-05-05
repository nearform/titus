'use strict'

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const chalk = require('chalk')

const warning = chalk.keyword('yellow')
const info = chalk.keyword('green')

const pkgDirs = getPkgDirs()
function getPkgDirs() {
  try {
    const packages = execSync('npx lerna ls --all --json')
    return JSON.parse(packages.toString()).map(
      ({ location }) => location
    )
  } catch (error) {
    console.log(warning('No packages found'))
    process.exit(0)
  }
}

function cleanEnv() {
  for (const pkgDir of pkgDirs) {
    const env = `${pkgDir}/.env`

    if (!fs.existsSync(env)) continue

    try {
      fs.unlinkSync(env)
      console.log(info(`Removed .env file at ${pkgDir}`))
    } catch (err) {
      console.log(warning(`No .env file at ${pkgDir}`))
    }
  }
}

function createEnv() {
  for (const pkgDir of pkgDirs) {
    const sample = `${pkgDir}/.env.sample`

    if (!fs.existsSync(sample)) continue

    const env = `${pkgDir}/.env`

    try {
      fs.accessSync(env)
      console.log(warning(`.env file at ${pkgDir} already exists`))
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        fs.copyFileSync(sample, env)
        console.log(info(`Created .env file at ${pkgDir}`))
      }
    }
  }
}

module.exports = {
  cleanEnv,
  createEnv
}
