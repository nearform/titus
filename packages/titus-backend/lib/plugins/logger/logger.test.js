'use strict'

const logger = require('.')

describe('logger utility', () => {
  it('should be able to do JSON logging using logger.log', () => {
    const logSpy = jest.spyOn(logger, 'log')
    logger.log({
      level: 'info',
      message: 'Pass an object and this works',
      additional: 'properties',
      are: 'passed along'
    })
    expect(logSpy).toHaveBeenCalled()
  })

  it('should be able to do JSON logging using logger.info', () => {
    const infoSpy = jest.spyOn(logger, 'info')
    logger.info({
      message: 'Use a helper method if you want',
      additional: 'properties',
      are: 'passed along'
    })
    expect(infoSpy).toHaveBeenCalled()
  })

  it('should allows for parameter-based using logger.log', () => {
    const infoSpy = jest.spyOn(logger, 'info')
    logger.log('info', 'Pass a message and this works', {
      additional: 'properties',
      are: 'passed along'
    })
    expect(infoSpy).toHaveBeenCalled()
  })

  it('should allows for parameter-based using logger.info', () => {
    const infoSpy = jest.spyOn(logger, 'info')
    logger.info('Use a helper method if you want', {
      additional: 'properties',
      are: 'passed along'
    })
    expect(infoSpy).toHaveBeenCalled()
  })

  it('should allows for string interpolation logger.log', () => {
    const logSpy = jest.spyOn(logger, 'log')
    logger.log('info', 'test message %s', 'my string')
    logger.log('info', 'test message %d', 123)
    logger.log('info', 'test message %s, %s', 'first', 'second', {
      number: 123
    })
    expect(logSpy).toHaveBeenCalled()
  })

  it('should be able to log using logger.warn', () => {
    const warnSpy = jest.spyOn(logger, 'warn')
    logger.warn('Maybe important error: ', new Error('Error passed as meta'))
    expect(warnSpy).toHaveBeenCalled()
  })

  it('should be able to log using logger.error', () => {
    const errorSpy = jest.spyOn(logger, 'error')
    logger.error(new Error('Error as info'))
    expect(errorSpy).toHaveBeenCalled()
  })
})
