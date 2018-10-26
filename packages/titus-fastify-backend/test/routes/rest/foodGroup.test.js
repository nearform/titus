const buildServer = require('../../build-server')

const fakeDbClientPlugin = require('../../_helpers/db-client')
const foodGroupRoutes = require('../../../lib/routes/rest/foodGroup')

test('get all food group API', async () => {
  const endpoints = {
    foodGroup: {
      getAll: jest.fn().mockReturnValue('getAll value')
    }
  }
  const plugins = [
    { plugin: fakeDbClientPlugin, options: { endpoints } },
    { plugin: foodGroupRoutes }
  ]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'GET', url: '/food-group' })

  expect(endpoints.foodGroup.getAll).toHaveBeenCalledTimes(1)

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('getAll value')
})

test('get food group API', async () => {
  const endpoints = {
    foodGroup: {
      getById: jest.fn().mockReturnValue('getById value')
    }
  }
  const plugins = [
    { plugin: fakeDbClientPlugin, options: { endpoints } },
    { plugin: foodGroupRoutes }
  ]
  const server = await buildServer(plugins)

  const response = await server.inject({
    method: 'GET',
    url: '/food-group/some-id'
  })

  expect(endpoints.foodGroup.getById).toHaveBeenCalledTimes(1)
  expect(endpoints.foodGroup.getById).toBeCalledWith({ id: 'some-id' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('getById value')
})

test('create food group API', async () => {
  const endpoints = {
    foodGroup: {
      create: jest.fn().mockReturnValue('create value')
    }
  }
  const plugins = [
    { plugin: fakeDbClientPlugin, options: { endpoints } },
    { plugin: foodGroupRoutes }
  ]
  const server = await buildServer(plugins)

  const response = await server.inject({
    method: 'PUT',
    url: '/food-group',
    body: { name: 'New Food Group' }
  })

  expect(endpoints.foodGroup.create).toHaveBeenCalledTimes(1)
  expect(endpoints.foodGroup.create).toBeCalledWith({ name: 'New Food Group' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('create value')
})
