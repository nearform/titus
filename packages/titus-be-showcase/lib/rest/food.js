'use strict'

const model = require('../model/food')

const search = async (pg, { needle, type }) => {
  return { data: await model.search(pg, { needle, type }) }
}

const keywordSearch = async (pg, { needle, type }) => {
  return { data: await model.keywordSearch(pg, { needle, type }) }
}

const getById = async (pg, { id }) => {
  return { data: await model.getById(pg, { id }) }
}

const getAll = async (pg, { offset, limit }) => {
  return { data: await model.getAll(pg, { offset, limit }) }
}

const create = async (pg, { food }) => {
  return { data: await model.create(pg, { food }) }
}

const update = async (pg, { food }) => {
  return { data: await model.update(pg, { food }) }
}

const deleteFoods = async (pg, { ids }) => {
  return { data: await model.deleteFoods(pg, { ids }) }
}

module.exports = {
  search,
  keywordSearch,
  getById,
  getAll,
  create,
  update,
  deleteFoods
}
