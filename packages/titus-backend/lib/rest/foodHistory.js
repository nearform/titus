'use strict'

const model = require('../model/foodHistory')

const findByFoodId = async (pg, { id }) => {
  const history = await model.findByFoodId(pg, { id })
  // sysPeriod field is a bit odd, and requires a bit of parsing for a useful output
  // e.g. : "[Wed Sep 19 2018 07:41:52 GMT+0000 (Coordinated Universal Time),Wed Sep 19 2018 07:46:00 GMT+0000 (Coordinated Universal Time))"
  return {
    data: history.map(({ sysPeriod, ...rest }) => ({
      ...rest,
      sysPeriod: [new Date(sysPeriod.begin), new Date(sysPeriod.end)]
    }))
  }
}

module.exports = {
  findByFoodId
}
