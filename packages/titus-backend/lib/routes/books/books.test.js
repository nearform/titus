'use strict'

describe('books routes', () => {
  let server, address
  const client = {
    query: jest.fn().mockResolvedValue([])
  }

  beforeAll(async () => {
    server = require('fastify')()
    server.register(require('fastify-postgres'))
    server.register(require('.'))
    address = await server.listen(5001)
    server.pg.connect = jest.fn()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  describe('get /books', () => {
    it('should return all books', async () => {
      const mockRows = [{ foo: 'bar' }, { bar: 'foo' }]
      client.query.mockResolvedValue({ rowCount: 2, rows: mockRows })
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books`
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows)

      expect(client.query).toHaveBeenCalledWith('SELECT * FROM books', [])
    })
    it('should return all books, with a specified title', async () => {
      const mockRows = [{ title: 'FooBar' }]
      client.query.mockResolvedValue({ rowCount: 1, rows: mockRows })
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books?title=FooBar`
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows)

      expect(client.query).toHaveBeenCalledWith(
        'SELECT * FROM books WHERE title=$1',
        ['FooBar']
      )
    })
    it('should return all books, invalid query param', async () => {
      const mockRows = [{ foo: 'bar' }, { bar: 'foo' }]
      client.query.mockResolvedValue({ rowCount: 2, rows: mockRows })
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books?foo=Bar`
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows)

      expect(client.query).toHaveBeenCalledWith('SELECT * FROM books', [])
    })
    it('should return a server error', async () => {
      client.query.mockRejectedValue(new Error('error'))
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books?foo=Bar`
      })

      expect(response.statusCode).toEqual(500)
      expect(JSON.parse(response.payload)).toEqual({ error: 'error' })

      expect(client.query).toHaveBeenCalledWith('SELECT * FROM books', [])
    })
  })
  describe('get /books/:id', () => {
    it('should return a book', async () => {
      const mockRows = [{ id: 123, foo: 'bar' }]
      client.query.mockResolvedValue({ rowCount: 1, rows: mockRows })
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books/123`
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows[0])

      expect(client.query).toHaveBeenCalledWith(
        'SELECT * FROM books WHERE id=$1',
        ['123']
      )
    })
    it('should return 404', async () => {
      client.query.mockResolvedValue({ rowCount: 0, rows: [] })
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books/123`
      })

      expect(response.statusCode).toEqual(404)
      expect(Object.keys(JSON.parse(response.payload))).toEqual(['error'])

      expect(client.query).toHaveBeenCalledWith(
        'SELECT * FROM books WHERE id=$1',
        ['123']
      )
    })
    it('should return a server error', async () => {
      client.query.mockRejectedValue(new Error('error'))
      server.pg.connect.mockResolvedValue(client)
      const response = await server.inject({
        method: 'GET',
        url: `${address}/books/123`
      })

      expect(response.statusCode).toEqual(500)
      expect(JSON.parse(response.payload)).toEqual({ error: 'error' })

      expect(client.query).toHaveBeenCalledWith(
        'SELECT * FROM books WHERE id=$1',
        ['123']
      )
    })
  })
})
