#! /usr/bin/env node
'use strict'

const program = require('commander')

const initAction = require('./actions/init')
const cleanAction = require('./actions/clean')

const { version } = require('./package.json')

program.version(version, '-v, --version')

program
  .command('init')
  .description('Create a Titus starter project')
  .option('--no-frontend', 'Do not clone React based frontend')
  .option('--no-backend', 'Do not clone HAPI based backend')
  .action(initAction)
  .arguments('<project>')

program
  .command('clean')
  .description('Clean up temporary directory in case of erro')
  .action(cleanAction)
  .arguments('<project>')

// unknown command passed then show help
program.on('command:*', () => program.help())

program.parse(process.argv)

// no arguments passed then show help
if (!process.argv.slice(2).length) {
  program.help()
}
