const chalk = require('chalk')
const dedent = require('dedent')
const fs = require('fs-extra')
const kebabCase = require('lodash.kebabcase')
const ora = require('ora')
const git = require('simple-git/promise')()

const REPO_URL =
  process.env.TITUS_REPO_URL || 'git@github.com:nearform/titus.git'

module.exports = async (input, { backend, frontend }) => {
  const projectDir = kebabCase(input) // require('path').join(process.cwd(), kebabCase(input))
  const spinner = ora()

  const tmpDir = `.${projectDir}-tmp`

  try {
    spinner.start('Pulling files from GitHub')
    await git.clone(REPO_URL, tmpDir)
    spinner.succeed('Pulled files from GitHub')

    if (frontend) {
      spinner
        .render()
        .start(`Setting up app in ${chalk.cyan.bold(`${projectDir}-frontend`)}`)
      await fs.copy(
        `${tmpDir}/packages/titus-frontend`,
        `${projectDir}-frontend`
      )
      const packageJson = await fs.readFile(
        `${projectDir}-frontend/package.json`,
        'utf8'
      )
      const newPackageJson = packageJson.replace(
        /titus-frontend/,
        `${projectDir}-frontend`
      )
      await fs.writeFile(`${projectDir}-frontend/package.json`, newPackageJson)
      spinner.succeed(
        `App setup in ${chalk.cyan.bold(`${projectDir}-frontend`)}`
      )
    }

    if (backend) {
      spinner
        .render()
        .start(
          `Setting up backend in ${chalk.cyan.bold(`${projectDir}-backend`)}`
        )
      await fs.copy(`${tmpDir}/packages/titus-backend`, `${projectDir}-backend`)
      const packageJson = await fs.readFile(
        `${projectDir}-backend/package.json`,
        'utf8'
      )
      const newPackageJson = packageJson
        .replace(/titus-backend/, `${projectDir}-backend`)
        .replace(/titus/g, projectDir)
      await fs.writeFile(`${projectDir}-backend/package.json`, newPackageJson)

      const envFile = await fs.readFile(
        `${projectDir}-backend/docker/dev.env`,
        'utf8'
      )
      const newEnvFile = envFile.replace(/titus/g, projectDir)
      await fs.writeFile(`${projectDir}-backend/docker/dev.env`, newEnvFile)

      spinner.succeed(
        `Backend setup in ${chalk.cyan.bold(`${projectDir}-backend`)}`
      )
    }

    spinner.render().start('Clearing temporary files')
    await fs.remove(`${tmpDir}`)
    spinner.succeed('Temporary files cleared')

    console.log(dedent`
      \nMove to your newly created project by running:

        ${frontend ? chalk.cyan.bold(`cd ${projectDir}-frontend`) : ''}${
      frontend && backend ? ` or ` : ''
    }${backend ? chalk.cyan.bold(`cd ${projectDir}-backend`) : ''}

      Install the project dependencies:

        ${chalk.cyan.bold('npm install')}

      Start the development server by running:

        ${chalk.cyan.bold('npm start')}

      Feedback is welcome at https://github.com/nearform/titus/issues
    `)
  } catch (error) {
    spinner.fail(error)
    console.log(
      '\n If this issue persists please raise an issue at https://github.com/nearform/titus/issues'
    )
  }
}
