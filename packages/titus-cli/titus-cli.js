#! /usr/bin/env node
'use strict'

const program = require('commander')

const initAction = require('./actions/init')

const { version } = require('./package.json')

program
  .version(version, '-v, --version')

program
  .command('init')
  .description('Clone the starter project(s)')
  .option('--no-react', 'Do not clone React App')
  .option('--no-hapi', 'Do not clone HAPI Api')
  .arguments('<project>')
  .action(initAction)

program.parse(process.argv)

// no arguments passed then show help
if (!process.argv.slice(2).length) {
  program.help()
}
