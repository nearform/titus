'use strict'
const model = require('../model/dietType')

const getAll = async pg => {
  return {data: await model.getAll(pg)}
}

const deleteDietType = async (pg, id) => {
  return {data: await model.deleteDietType(pg, {id})}
}

const toggleDietTypeVisibility = async (pg, { id }) => {
  return {data: await model.toggleDietTypeVisibility(pg, {id})}
}

module.exports = {
  getAll,
  deleteDietType,
  toggleDietTypeVisibility
}
