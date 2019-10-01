'use strict'
const pg = require('../../services/pg')

const baseQuery = `SELECT *, to_char(published, 'YYYY-MM-DD') as published FROM books`

jest.mock('../../services/pg', () => ({
  query: jest.fn()
}))

describe('books routes', () => {
  let server, address

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('.'))
    address = await server.listen(5001)
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  describe('get /books', () => {
    it('should return all books', async () => {
      const mockRows = [{ foo: 'bar' }, { bar: 'foo' }]
      pg.query.mockResolvedValue({ rows: mockRows })
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books`
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows)

      expect(pg.query).toHaveBeenCalledWith(baseQuery, [])
    })
    it('should return a server error', async () => {
      pg.query.mockRejectedValue(new Error('error'))
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books?foo=Bar`
      })

      expect(response.statusCode).toEqual(500)
      expect(JSON.parse(response.payload)).toEqual({ error: 'error' })

      expect(pg.query).toHaveBeenCalledWith(baseQuery, [])
    })
  })
  describe('get /books/:id', () => {
    it('should return a book', async () => {
      const mockRows = [{ id: 123, foo: 'bar' }]
      pg.query.mockResolvedValue({ rows: mockRows })
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books/123`
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows[0])

      expect(pg.query).toHaveBeenCalledWith(`${baseQuery} WHERE id=$1`, ['123'])
    })
    it('should return 404', async () => {
      pg.query.mockResolvedValue({ rows: [] })
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books/123`
      })

      expect(response.statusCode).toEqual(404)
      expect(Object.keys(JSON.parse(response.payload))).toEqual(['error'])

      expect(pg.query).toHaveBeenCalledWith(`${baseQuery} WHERE id=$1`, ['123'])
    })
    it('should return a server error', async () => {
      pg.query.mockRejectedValue(new Error('error'))
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books/123`
      })

      expect(response.statusCode).toEqual(500)
      expect(JSON.parse(response.payload)).toEqual({ error: 'error' })

      expect(pg.query).toHaveBeenCalledWith(`${baseQuery} WHERE id=$1`, ['123'])
    })
  })
})
