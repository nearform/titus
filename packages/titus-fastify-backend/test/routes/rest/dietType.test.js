const buildServer = require('../../build-server')

const fakeDbClientPlugin = require('../../_helpers/db-client')
const dietTypeRoutes = require('../../../lib/routes/rest/dietType')

test('get all diet type API', async () => {
  const endpoints = {
    dietType: {
      getAll: jest.fn().mockReturnValue('getAll value')
    }
  }
  const plugins = [
    { plugin: fakeDbClientPlugin, options: { endpoints } },
    { plugin: dietTypeRoutes }
  ]
  const server = await buildServer(plugins)

  const response = await server.inject({ method: 'GET', url: '/diet-type' })

  expect(endpoints.dietType.getAll).toHaveBeenCalledTimes(1)

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('getAll value')
})

test('update diet type API', async () => {
  const endpoints = {
    dietType: {
      update: jest.fn().mockReturnValue('update value')
    }
  }
  const plugins = [
    { plugin: fakeDbClientPlugin, options: { endpoints } },
    { plugin: dietTypeRoutes }
  ]
  const server = await buildServer(plugins)

  const response = await server.inject({
    method: 'POST',
    url: '/diet-type/some-id',
    body: { name: 'Updated Diet Type', visible: false }
  })

  expect(endpoints.dietType.update).toHaveBeenCalledTimes(1)
  expect(endpoints.dietType.update).toBeCalledWith({
    id: 'some-id',
    name: 'Updated Diet Type',
    visible: false
  })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('update value')
})

test('delete diet type API', async () => {
  const endpoints = {
    dietType: {
      delete: jest.fn().mockReturnValue('delete value')
    }
  }
  const plugins = [
    { plugin: fakeDbClientPlugin, options: { endpoints } },
    { plugin: dietTypeRoutes }
  ]
  const server = await buildServer(plugins)

  const response = await server.inject({
    method: 'DELETE',
    url: '/diet-type/some-id'
  })

  expect(endpoints.dietType.delete).toHaveBeenCalledTimes(1)
  expect(endpoints.dietType.delete).toBeCalledWith({ id: 'some-id' })

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual('delete value')
})
