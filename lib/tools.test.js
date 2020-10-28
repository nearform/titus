'use strict'

const { execSync } = require('child_process')
const fs = require('fs')

describe('tools', () => {
  let numberOfPackages

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
    const accessSync = jest.spyOn(fs, 'accessSync')
    const copyFileSync = jest.spyOn(fs, 'copyFileSync')

    const tools = require('./tools')

    tools.createEnv()

    expect(accessSync).toHaveBeenCalledTimes(numberOfPackages)
    expect(copyFileSync).toHaveBeenCalledTimes(numberOfPackages)
  })

  it('cleans env files', () => {
    const unlinkSync = jest.spyOn(fs, 'unlinkSync')

    const tools = require('./tools')

    tools.cleanEnv()

    expect(unlinkSync).toHaveBeenCalledTimes(numberOfPackages)
  })
})
