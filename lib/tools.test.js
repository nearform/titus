'use strict'

const {execSync} = require('child_process')
const fs = require('fs')

describe('tools', () => {
  let numberOfPackages

  beforeAll(() => {
    try {
      const output = execSync('npx lerna ls --all --json')
      numberOfPackages = JSON.parse(output.toString()).map(packageItem => `../packages/${packageItem.name}`).length
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

  it('create env files if they don\'t exist', async () => {
    jest.spyOn(fs, 'access').mockImplementation(async (file, cb) => {
      const error = new Error('file doesnt exist')
      error.code = 'ENOENT'
      cb(error)
    })
    jest.spyOn(fs, 'copyFile').mockImplementation(async (src, dest, cb) => {
      cb()
    })

    const tools = require('./tools')

    await tools.createEnvs()

    expect(fs.access).toHaveBeenCalledTimes(numberOfPackages)
    expect(fs.copyFile).toHaveBeenCalledTimes(numberOfPackages)
  })

  it('cleans env files', async () => {
    jest.spyOn(fs, 'unlink').mockImplementation(async (path, cb) => {
      cb()
    })

    const tools = require('./tools')

    await tools.cleanEnvs()

    expect(fs.unlink).toHaveBeenCalledTimes(numberOfPackages)
  })
})
