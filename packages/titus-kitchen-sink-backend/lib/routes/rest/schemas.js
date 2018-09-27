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

const swaggerIdList = joi
  .string()
  .label('ids')
  .trim()
  .regex(/^[0-9a-zA-Z-]+\s*(,\s*[0-9a-zA-Z-]*)*$/)
  .required()

const idList = async ({ ids }) => {
  joi.assert(ids, swaggerIdList)
  return Promise.resolve({ ids: ids.split(',').map(s => s.trim()) })
}

const foodGroup = joi.object().keys({
  id,
  name: joi.string().required(),
  created: joi.date(),
  modified: joi.date()
})

const food = joi.object().keys({
  id,
  name: joi.string().required(),
  created: joi.date(),
  modified: joi.date(),
  foodGroup
})

const foodWithFoodGroupId = joi.object().keys({
  id,
  name: joi.string().required(),
  foodGroupId: id
})

const foodGroupWithoutId = joi.object().keys({
  name: joi.string().required()
})

const foodWithoutId = joi.object().keys({
  name: joi.string().required(),
  foodGroupWithoutId
})

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
  food,
  foodWithoutId,
  foodWithFoodGroupId,
  foodGroup,
  foodGroupWithoutId,
  idList,
  swaggerIdList
}
