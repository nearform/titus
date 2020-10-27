'use strict'

const createUser = require('./lib/create-user')

const argv = require('yargs')
  .usage('Usage: $0 --email [email|username] --password [...]')
  .demandOption(['email']).argv

async function run() {
  try {
    await createUser(argv.email, argv.password)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

run()
