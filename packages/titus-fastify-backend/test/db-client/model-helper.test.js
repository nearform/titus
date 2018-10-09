const modelHelperFactory = require('../../lib/db-client/model-helper')

test('modelHelper should resolve value from the input function', async () => {
  const pg = 'pg-client'
  const modelHelper = modelHelperFactory(pg)

  expect(modelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockResolvedValue('some response')
  const wrappedFn = modelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  const res = wrappedFn('options')

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
  expect(res).resolves.toEqual('some response')
})
