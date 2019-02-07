const joi = require('joi')

const id = joi
  .string()
  .guid()
  .required()
const offset = joi
  .number()
  .integer()
  .default(0)
const limit = joi
  .number()
  .integer()
  .default(50)

const idList = async ({ ids }) => {
  return Promise.resolve({ ids: ids.split(',').map(s => s.trim()) })
}

const needle = joi.string().required()

const type = joi
  .string()
  .allow('startsWith', 'endsWith', 'fullText', 'similarity')

const keywordType = joi
  .string()
  .allow(
    'startsWith',
    'endsWith',
    'contains',
    'levenshtein',
    'soundex',
    'metaphone',
    'similarity'
  )
  .required()

module.exports = {
  id,
  offset,
  limit,
  needle,
  type,
  keywordType,
  idList
}
