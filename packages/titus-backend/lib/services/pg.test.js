'use strict'
const Pool = require('pg-pool')
const pg = require('./pg')

jest.mock('pg-pool')

describe('pg service', () => {
  afterEach(() => {
    Pool.mockClear()
  })
  describe('connect', () => {
    it('actively connects', async () => {
      expect(pg.getPool()).toBeFalsy()
      pg.connect()
      expect(Pool).toHaveBeenCalledTimes(1)
      expect(pg.getPool()).toBeTruthy()
      pg.disconnect()
    })
    it('only connects once', async () => {
      expect(pg.getPool()).toBeFalsy()
      pg.connect()
      pg.connect()
      expect(Pool).toHaveBeenCalledTimes(1)
      expect(pg.getPool()).toBeTruthy()
      pg.disconnect()
    })
  })
  describe('disconnect', () => {
    it('does not need to disconnect', async () => {
      pg.disconnect()
      expect(Pool.mock.instances.length).toBe(0)
    })
    it('actively disconnects', async () => {
      pg.connect()
      pg.disconnect()
      const { calls } = Pool.mock.instances[0].end.mock
      expect(calls.length).toBe(1)
    })
  })
  describe('query', () => {
    it('makes a query', async () => {
      pg.query('FOO BAR', ['foo'])
      const { calls } = Pool.mock.instances[0].query.mock
      expect(calls).toEqual([['FOO BAR', ['foo']]])
      pg.disconnect()
    })
    it('defaults to no params', async () => {
      pg.query('FOO BAR')
      const { calls } = Pool.mock.instances[0].query.mock
      expect(calls).toEqual([['FOO BAR', []]])
      pg.disconnect()
    })
  })
})
