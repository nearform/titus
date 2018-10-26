const httpErrors = require('http-errors')

module.exports = function(err) {
  if (!err.isDBError) {
    return err
  }

  if (err.isNotFound) return new httpErrors.NotFound()
  if (err.isDuplicateKey) return new httpErrors.BadRequest()
  if (err.isForeignKeyViolation) return new httpErrors.BadRequest()

  return new httpErrors.InternalServerError()
}
