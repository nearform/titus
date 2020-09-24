const {handler} = require('./get-config')

describe('Lambda/get-config', () => {
  it('Return the config based on ENV', async () => {

    process.env.APP_CONFIG_foo = 'test'
    process.env.APP_CONFIG_bar = 'test2'
    process.env.NO_CONFIG_baz = 'test3'
    const result = await handler()

    expect(result).toEqual({
      statusCode: 200,
      body: '{"foo":"test","bar":"test2"}',
      headers: {
        'Access-Control-Allow-Origin': undefined,
        'Access-Control-Allow-Credentials': false
      }
    })
  })
})
