const envSchema = require('env-schema')
const S = require('fluent-schema')

const env = process.env.NODE_ENV || 'development'

const schemas = {
  development: S.object().prop(
    'REACT_APP_API_PATH',
    S.string().minLength(1).required()
  ),

  production: S.object().prop(
    'REACT_APP_API_PATH',
    S.string().minLength(1).required()
  )
}

envSchema({
  schema: schemas[env],
  dotenv: true
})
