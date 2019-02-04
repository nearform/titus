'use strict'

const formatRows = require('./util').formatRows
const SQL = require('@nearform/sql')

const findByFoodId = async (pg, { id }) => {
  const res = await pg.query(SQL`
    SELECT id, name, food_group_id, created, modified, sys_period FROM food_history WHERE id = ${id}`)

  return formatRows(res.rows)
}

module.exports = {
  findByFoodId
}
