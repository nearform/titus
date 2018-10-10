const SQL = require('@nearform/sql')
const camelize = require('camelize')

const { toTsQuery } = require('../helpers')

module.exports = async function search (pg, { needle, type }) {
  const sql = SQL`
    SELECT
      id,
      name,
      food_group_id,
      created,
      modified
    FROM food
  `

  const whereClause = {
    startsWith: SQL` WHERE name ILIKE(${needle + '%'}) ORDER BY LENGTH(name), name`,
    endsWith: SQL` WHERE name ILIKE(${'%' + needle}) ORDER BY LENGTH(name), name`,
    fullText: SQL` WHERE to_tsvector(name) @@ to_tsquery(${toTsQuery(needle)})`,
    similarity: SQL` WHERE to_tsvector(name) @@ to_tsquery(${toTsQuery(needle)})`
  }
  const defaultClause = SQL` WHERE name ILIKE(${'%' + needle + '%'}) ORDER BY LENGTH(name), name`
  sql.append(whereClause[type] || defaultClause)

  const result = await pg.query(sql)

  return camelize(result.rows)
}
