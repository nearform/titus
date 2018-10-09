class NotFoundError extends Error {}
tag(NotFoundError, 'isNotFound')

module.exports = {
  NotFoundError
}

function tag (Cls, prop) {
  Object.defineProperty(Cls.prototype, 'isDBError', { value: true })
  Object.defineProperty(Cls.prototype, prop, { value: true })
}
