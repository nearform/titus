const yup = require('yup')

const schemas = {
  development: yup.object().shape({
    REACT_APP_API_PATH: yup.string().required('REACT_APP_API_PATH is required')
  }),

  production: yup.object().shape({
    REACT_APP_API_PATH: yup.string().required('REACT_APP_API_PATH is required')
  })
}

const env = process.env.NODE_ENV || 'development'

schemas[env]
  .validate(process.env)
  .then(() => console.info('The env variables are valid'))
  .catch(err => {
    console.error(`Environment variables errors: ${err.errors}`)
    return process.exit(1)
  })
