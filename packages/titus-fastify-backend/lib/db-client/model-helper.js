const dbErrors = require('./errors')

const DUPLICATE_KEY = '23505'
const FOREIGN_KEY_VIOLATION = '23503'

function handleDBError (err) {
  if (err.isDBError) return Promise.reject(err)

  if (err.code === DUPLICATE_KEY) {
    return Promise.reject(new dbErrors.DuplicateKeyError('Duplicate data'))
  }

  if (err.code === FOREIGN_KEY_VIOLATION) {
    return Promise.reject(new dbErrors.ForeignKeyViolationError())
  }

  return Promise.reject(new dbErrors.GenericDBError(err.message))
}

module.exports = (pg) => (fn) => (opts) => fn(pg, opts).catch(handleDBError)
