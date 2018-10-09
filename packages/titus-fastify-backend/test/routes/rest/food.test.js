const buildServer = require('../../build-server')

const fakeDbClientPlugin = require('../../_helpers/db-client')
const foodRoutes = require('../../../lib/routes/rest/food')

test('get all food API', async () => {
  const endpoints = {
    food: {
      getAll: jest.fn().mockReturnValue('getAll value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'GET', url: '/food?offset=10&limit=5' })

  expect(endpoints.food.getAll).toHaveBeenCalledTimes(1)
  expect(endpoints.food.getAll).toBeCalledWith({ offset: 10, limit: 5 })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('getAll value')
})

test('get food API', async () => {
  const endpoints = {
    food: {
      getById: jest.fn().mockReturnValue('getById value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'GET', url: '/food/123' })

  expect(endpoints.food.getById).toHaveBeenCalledTimes(1)
  expect(endpoints.food.getById).toBeCalledWith({ id: '123' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('getById value')
})

test('search API', async () => {
  const endpoints = {
    food: {
      search: jest.fn().mockReturnValue('search value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'GET', url: '/food/search/typ/ndl' })

  expect(endpoints.food.search).toHaveBeenCalledTimes(1)
  expect(endpoints.food.search).toBeCalledWith({ type: 'typ', needle: 'ndl' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('search value')
})

test('keyword API', async () => {
  const endpoints = {
    food: {
      keyword: jest.fn().mockReturnValue('keyword value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'GET', url: '/food/keyword/kwd/ndl' })

  expect(endpoints.food.keyword).toHaveBeenCalledTimes(1)
  expect(endpoints.food.keyword).toBeCalledWith({ keywordType: 'kwd', needle: 'ndl' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('keyword value')
})

test('save food API', async () => {
  const endpoints = {
    food: {
      create: jest.fn().mockReturnValue('create value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'PUT', url: '/food', body: { name: 'New Food', foodGroupId: 111 } })

  expect(endpoints.food.create).toHaveBeenCalledTimes(1)
  expect(endpoints.food.create).toBeCalledWith({ food: { name: 'New Food', foodGroupId: '111' } })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('create value')
})

test('update food API', async () => {
  const endpoints = {
    food: {
      update: jest.fn().mockReturnValue('update value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'POST', url: '/food', body: { id: 22, name: 'Updated Food', foodGroupId: 101 } })

  expect(endpoints.food.update).toHaveBeenCalledTimes(1)
  expect(endpoints.food.update).toBeCalledWith({ food: { id: '22', name: 'Updated Food', foodGroupId: '101' } })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('update value')
})

test('delete foods API', async () => {
  const endpoints = {
    food: {
      deleteFoods: jest.fn().mockReturnValue('deleteFoods value')
    }
  }
  const plugins = [{ plugin: fakeDbClientPlugin, options: { endpoints } }, { plugin: foodRoutes }]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'DELETE', url: '/food/1,2,3,4,5' })

  expect(endpoints.food.deleteFoods).toHaveBeenCalledTimes(1)
  expect(endpoints.food.deleteFoods).toBeCalledWith({ ids: '1,2,3,4,5' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('deleteFoods value')
})
