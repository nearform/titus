'use strict'

const model = require('../model/foodGroup')

const getById = async (pg, { id }) => {
  return { data: await model.getById(pg, { id }) }
}

const getByIds = async (pg, ids) => {
  return { data: await model.getByIds(pg, ids) }
}

const getAll = async pg => {
  return { data: await model.getAll(pg) }
}

const create = async (pg, { name }) => {
  return { data: await model.create(pg, { name }) }
}

module.exports = {
  getById,
  getByIds,
  getAll,
  create
}
