const transactionalModelHelperFactory = require('../../lib/db-client/transactional-model-helper')
const dbErrors = require('../../lib/db-client/errors')

const getErrorStub = (code, message) => {
  const err = new Error(message)
  err.code = code

  return err
}

test('transactionalModelHelper should resolve value from the input function', async () => {
  const pg = { transact: async (fn) => fn('pg-client') }
  const transactionalModelHelper = transactionalModelHelperFactory(pg)

  expect(transactionalModelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockResolvedValue('some response')
  const wrappedFn = transactionalModelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  const res = wrappedFn('options')

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
  expect(res).resolves.toEqual('some response')
})

test('transactionalModelHelper should reject with GenericDBError when input function throws', async () => {
  const pg = { transact: async (fn) => fn('pg-client') }
  const transactionalModelHelper = transactionalModelHelperFactory(pg)

  expect(transactionalModelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockRejectedValue(new Error('some error occured'))
  const wrappedFn = transactionalModelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  await expect(
    wrappedFn('options')
  ).rejects.toThrowError('some error occured')

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
})

test('transactionalModelHelper should reject with DuplicateKeyError when input function throws with error code 23505', async () => {
  const pg = { transact: async (fn) => fn('pg-client') }
  const transactionalModelHelper = transactionalModelHelperFactory(pg)

  expect(transactionalModelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockRejectedValue(getErrorStub('23505', 'Some duplicate key error'))
  const wrappedFn = transactionalModelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  await expect(
    wrappedFn('options')
  ).rejects.toThrow(expect.any(dbErrors.DuplicateKeyError))

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
})

test('transactionalModelHelper should reject with DuplicateKeyError when input function throws with error code 23503', async () => {
  const pg = { transact: async (fn) => fn('pg-client') }
  const transactionalModelHelper = transactionalModelHelperFactory(pg)

  expect(transactionalModelHelper).toEqual(expect.any(Function))

  const fn = jest.fn().mockRejectedValue(getErrorStub('23503', 'Some forieng key violation error'))
  const wrappedFn = transactionalModelHelper(fn)

  expect(wrappedFn).toEqual(expect.any(Function))

  await expect(
    wrappedFn('options')
  ).rejects.toThrow(expect.any(dbErrors.ForeignKeyViolationError))

  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toBeCalledWith('pg-client', 'options')
})
