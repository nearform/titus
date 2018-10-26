const modelHelperFactory = require('../../lib/db-client/model-helper')
const dbErrors = require('../../lib/db-client/errors')

const getErrorStub = (code, message) => {
  const err = new Error(message)
  err.code = code

  return err
}

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

test('modelHelper should reject with GenericDBError when input function throws', async () => {
  const pg = 'pg-client'
  const modelHelper = modelHelperFactory(pg)

  expect(modelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockRejectedValue(new Error('some error occured'))
  const wrappedFn = modelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  await expect(wrappedFn('options')).rejects.toThrowError('some error occured')

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
})

test('modelHelper should reject with DuplicateKeyError when input function throws with error code 23505', async () => {
  const pg = 'pg-client'
  const modelHelper = modelHelperFactory(pg)

  expect(modelHelper).toEqual(expect.any(Function))

  const fn = jest
    .fn()
    .mockRejectedValue(getErrorStub('23505', 'Some duplicate key error'))
  const wrappedFn = modelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  await expect(wrappedFn('options')).rejects.toThrow(
    expect.any(dbErrors.DuplicateKeyError)
  )

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
})

test('modelHelper should reject with DuplicateKeyError when input function throws with error code 23503', async () => {
  const pg = 'pg-client'
  const modelHelper = modelHelperFactory(pg)

  expect(modelHelper).toEqual(expect.any(Function))

  const fn = jest
    .fn()
    .mockRejectedValue(
      getErrorStub('23503', 'Some forieng key violation error')
    )
  const wrappedFn = modelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  await expect(wrappedFn('options')).rejects.toThrow(
    expect.any(dbErrors.ForeignKeyViolationError)
  )

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
})
