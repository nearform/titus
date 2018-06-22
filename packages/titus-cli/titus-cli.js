#! /usr/bin/env node
'use strict'

const program = require('commander')

const { version } = require('./package.json')

program
  .version(version, '-v, --version')

program
  .command('starter')
  .description('Clone the starter shell')
  .action(() => {
    console.log('This is where the magic happens.')
  })

program.parse(process.argv)

// no arguments passed then show help
if (!process.argv.slice(2).length) {
  program.help()
}
