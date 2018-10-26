class GenericDBError extends Error {}
tag(GenericDBError, 'isGeneric')

class NotFoundError extends Error {}
tag(NotFoundError, 'isNotFound')

class DuplicateKeyError extends Error {}
tag(DuplicateKeyError, 'isDuplicateKey')

class ForeignKeyViolationError extends Error {}
tag(ForeignKeyViolationError, 'isForeignKeyViolation')

module.exports = {
  GenericDBError,
  NotFoundError,
  DuplicateKeyError,
  ForeignKeyViolationError
}

function tag(Cls, prop) {
  Object.defineProperty(Cls.prototype, 'isDBError', { value: true })
  Object.defineProperty(Cls.prototype, prop, { value: true })
}
