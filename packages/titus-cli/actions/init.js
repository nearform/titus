const chalk = require('chalk')
const dedent = require('dedent')
const fs = require('fs-extra')
const kebabCase = require('lodash.kebabcase')
const ora = require('ora')
const git = require('simple-git/promise')()

const REPO_URL = 'git@github.com:nearform/titus.git'

module.exports = async (input, { hapi, react }) => {
  const projectDir = kebabCase(input)

  const spinner = ora()

  const tmpDir = `.${projectDir}-tmp`

  try {
    spinner.start('Pulling files from GitHub')
    await git.clone(REPO_URL, tmpDir)
    spinner.succeed('Pulled files from GitHub')

    if (react) {
      spinner.render().start(`Setting up app in ${chalk.cyan.bold(`${projectDir}-app`)}`)
      await fs.copy(`${tmpDir}/packages/titus-starter`, `${projectDir}-app`)
      const packageJson = await fs.readFile(`${projectDir}-app/package.json`, 'utf8')
      const newPackageJson = packageJson
        .replace(/titus-starter/, `${projectDir}-app`)
      await fs.writeFile(`${projectDir}-app/package.json`, newPackageJson)
      spinner.succeed(`App setup in ${chalk.cyan.bold(`${projectDir}-app`)}`)
    }

    if (hapi) {
      spinner.render().start(`Setting up api in ${chalk.cyan.bold(`${projectDir}-api`)}`)
      await fs.copy(`${tmpDir}/packages/titus-starter-backend`, `${projectDir}-api`)
      const packageJson = await fs.readFile(`${projectDir}-api/package.json`, 'utf8')
      const newPackageJson = packageJson
        .replace(/titus-starter-backend/, `${projectDir}-api`)
        .replace(/titus/g, projectDir)
      await fs.writeFile(`${projectDir}-api/package.json`, newPackageJson)

      const envFile = await fs.readFile(`${projectDir}-api/docker/dev.env`, 'utf8')
      const newEnvFile = envFile
        .replace(/titus/g, projectDir)
      await fs.writeFile(`${projectDir}-api/docker/dev.env`, newEnvFile)

      spinner.succeed(`Api setup in ${chalk.cyan.bold(`${projectDir}-api`)}`)
    }

    spinner.render().start('Clearing temporary files')
    await fs.remove(`${tmpDir}`)
    spinner.succeed('Temporary files cleared')

    console.log(dedent`
      \nMove to your newly created project by running:

        ${react ? chalk.cyan.bold(`cd ${projectDir}-app`) : ''}${react && hapi ? ` or ` : ''}${hapi ? chalk.cyan.bold(`cd ${projectDir}-api`) : ''}

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
}
