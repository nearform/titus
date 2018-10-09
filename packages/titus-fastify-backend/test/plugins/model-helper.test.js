const modelHelperFn = require('../../lib/plugins/model-helper')

test('modelHelper should resolve value from the input function', async () => {
  const pg = 'pg-client'
  const modelHelper = modelHelperFn(pg)

  expect(modelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockResolvedValue('some response')
  const wrappedFn = modelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  const res = wrappedFn('options')

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
  expect(res).resolves.toEqual({ data: 'some response' })
})
