'use strict'

const listUsers = require('./lib/list-users')

async function run() {
  try {
    await listUsers()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

run()
