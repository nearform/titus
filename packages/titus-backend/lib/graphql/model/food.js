'use strict'

const formatRows = require('./util').formatRows
const SQL = require('@nearform/sql')

const getById = async (pg, { id }) => {
  const res = await pg.query(SQL`
    SELECT id, name, food_group_id, created, modified FROM food WHERE id = ${id}`)
  return formatRows(res.rows)[0]
}

const getAll = async (pg, {offset, limit}) => {
  const offsetVal = !isNaN(parseInt(offset)) ? offset : 0
  const limitVal = !isNaN(parseInt(limit)) ? limit : null
  const res = await pg.query(SQL`
      SELECT id, name, food_group_id, created, modified FROM food ORDER BY created, name
      OFFSET ${offsetVal}
      LIMIT ${limitVal}
      `)
  return formatRows(res.rows)
}

const create = async (pg, { food }) => {
  const sql = food.foodGroupId
    ? SQL`INSERT INTO food (name, food_group_id)
    VALUES (${food.name}, ${food.foodGroupId})
    RETURNING id`
    : SQL`INSERT INTO food (name, food_group_id)
    VALUES (${food.name},
       (SELECT id FROM food_group WHERE name = ${food.foodGroup}))
      RETURNING id`
  const res = await pg.query(sql)
  return res.rows[0].id
}

const update = async (pg, { food }) => {
  const res = await pg.query(SQL`UPDATE food
  SET name = ${food.name}, food_group_id = ${food.foodGroupId}, modified = now()
  WHERE id = ${food.id}`)
  const updated = await getById(pg, food)
  return { id: food.id, typeName: 'Food', operation: 'update', count: res.rowCount, updated }
}

const deleteFoods = async (pg, { ids }) => {
  const res = await pg.query(SQL`
    DELETE FROM food WHERE id = ANY(${[ids]}::text[])`)
  return { ids, typeName: 'Food', operation: 'delete', count: res.rowCount }
}

module.exports = {
  getById,
  getAll,
  create,
  update,
  deleteFoods
}
