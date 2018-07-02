#! /usr/bin/env node
'use strict'

const program = require('commander')
const dedent = require('dedent')
const fs = require('fs-extra')
const chalk = require('chalk')
const ora = require('ora')
const git = require('simple-git/promise')()

const { version } = require('./package.json')

const REPO_URL = 'git@github.com:nearform/titus.git'

program
  .version(version, '-v, --version')

program
  .command('starter')
  .description('Clone the starter shell')
  .arguments('<project-directory>')
  .action(async (projectDir) => {
    let spinner

    try {
      spinner = ora(
        `Setting up the Titus starter application in ${chalk.cyan.bold(projectDir)}`
      ).start()

      await git.clone(REPO_URL, `${projectDir}/.tmp`)
      await fs.copy(`${projectDir}/.tmp/packages/titus-starter`, `${projectDir}`)
      await fs.remove(`${projectDir}/.tmp`)

      spinner.succeed(chalk.green.bold(`Setup complete! \n`))

      console.log(dedent`
        Move to your newly created project by running:

          ${chalk.cyan.bold(`cd ${projectDir}`)}

        Install the project dependencies:

          ${chalk.cyan.bold('npm install')}

        Start the development server by running:

          ${chalk.cyan.bold('npm start')}

        Feedback is welcome at https://github.com/nearform/titus/issues
      `)
    } catch (error) {
      spinner.fail(error)
      console.log('\n If this issue persists please raise an issue at https://github.com/nearform/titus/issues')
    }
  })

program.parse(process.argv)

// no arguments passed then show help
if (!process.argv.slice(2).length) {
  program.help()
}
