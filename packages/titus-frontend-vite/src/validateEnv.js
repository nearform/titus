const S = require('fluent-schema')

const env = process.env.NODE_ENV || 'development'

const schemas = {
  development: S.object().prop(
    'VITE_API_PATH',
    S.string().minLength(1).required()
  ),

  production: S.object().prop(
    'VITE_API_PATH',
    S.string().minLength(1).required()
  )
}

const validate = function () {
  require('env-schema')({
    schema: schemas[env],
    dotenv: true
  })
}

module.exports = {
  validate
}
