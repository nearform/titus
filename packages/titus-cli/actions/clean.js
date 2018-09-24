const kebabCase = require('lodash.kebabcase')
const fs = require('fs-extra')

const ora = require('ora')

module.exports = async (input, { backend, frontend }) => {
  const projectDir = kebabCase(input)
  const spinner = ora()

  const tmpDir = `.${projectDir}-tmp`
  spinner.start(`Deleting temporary directory '${tmpDir}'`)
  await fs.remove(tmpDir)
  spinner.succeed(`Temporary directory '${tmpDir}' deleted !`)

  const frontendDir = `${projectDir}-frontend`

  await fs.remove(frontendDir)
  spinner.succeed(`Frontend directory '${frontendDir}' deleted !`)

  const backendDir = `${projectDir}-backend`

  await fs.remove(backendDir)
  spinner.succeed(`Backend directory '${backendDir}' deleted !`)
}
