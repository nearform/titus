'use strict'

const { execSync } = require('child_process')
const fs = require('fs')

const tools = require('./tools')

describe('tools', () => {
  let numberOfPackages

  jest.spyOn(fs, 'existsSync').mockImplementation(packagePath => {
    return packagePath.includes('infra') ? false : true
  })

  const accessSyncMock = jest.spyOn(fs, 'accessSync').mockImplementation(() => {
    const error = new Error('file doesnt exist')
    error.code = 'ENOENT'
    throw error
  })
  const copyFileSyncMock = jest
    .spyOn(fs, 'copyFileSync')
    .mockImplementation(() => true)

  const unlinkSyncMock = jest
    .spyOn(fs, 'unlinkSync')
    .mockImplementation(() => true)

  beforeAll(() => {
    try {
      const output = execSync('npx lerna ls --all --json')
      numberOfPackages = JSON.parse(output.toString())
        .map(packageItem => `../packages/${packageItem.name}`)
        .filter(packagePath => !packagePath.includes('infra')).length
    } catch (error) {
      console.log('No packages found')
    }
  })

  beforeEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.resetModules()
    jest.resetAllMocks()
  })

  it("create env files if they don't exist", () => {
    tools.createEnv()

    expect(accessSyncMock).toHaveBeenCalledTimes(numberOfPackages)
    expect(copyFileSyncMock).toHaveBeenCalledTimes(numberOfPackages)
  })

  it('cleans env files', () => {
    tools.cleanEnv()

    expect(unlinkSyncMock).toHaveBeenCalledTimes(numberOfPackages)
  })
})
