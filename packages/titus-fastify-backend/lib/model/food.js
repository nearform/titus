'use strict'

const formatRows = require('./util').formatRows
const toTsQuery = require('./util').toTsQuery
const SQL = require('@nearform/sql')

const search = async (pg, { needle, type }) => {
  const whereClause = {
    startsWith: SQL` WHERE name ILIKE(${needle +
      '%'}) ORDER BY LENGTH(name), name`,
    endsWith: SQL` WHERE name ILIKE(${'%' +
      needle}) ORDER BY LENGTH(name), name`,
    fullText: SQL` WHERE to_tsvector(name) @@ to_tsquery(${toTsQuery(needle)})`,
    similarity: SQL` WHERE to_tsvector(name) @@ to_tsquery(${toTsQuery(
      needle
    )})`
  }
  const defaultClause = SQL` WHERE name ILIKE(${'%' +
    needle +
    '%'}) ORDER BY LENGTH(name), name`

  const sql = SQL`SELECT id, name, food_group_id, created, modified FROM food`
  sql.append(whereClause[type] || defaultClause)
  const res = await pg.query(sql)
  return formatRows(res.rows)
}

const keywordSearch = async (pg, { needle, type }) => {
  // defaulting to trigram distance, same as 1-similarity
  let sql = SQL`SELECT word, word <-> ${needle} score FROM food_words
    where word <-> ${needle} < 0.7
    ORDER BY SCORE`

  switch (type) {
    case 'startsWith':
      sql = SQL` SELECT word, 1
        FROM food_words
        WHERE word ILIKE(${needle + '%'})
        ORDER BY LENGTH(word), word`
      break
    case 'contains':
      sql = SQL` SELECT word, 1
        FROM food_words
        WHERE word ILIKE(${'%' + needle + '%'})
        ORDER BY LENGTH(word), word`
      break
    case 'endsWith':
      sql = SQL` SELECT word, 1
        FROM food_words
        WHERE word ILIKE(${'%' + needle})
        ORDER BY LENGTH(word), word`
      break
    case 'levenshtein':
      // requires fuzzy extension, basically a fuzzy search, not as efficient as trigram
      // this might be better calculated as a percentage e.g. abc vs abd should be further
      // scored far less than abcdefg vs abddefg, we're just giving back distance, there are a few variants
      sql = SQL` SELECT word, levenshtein(${needle}, word) score
        FROM food_words
        WHERE levenshtein(${needle}, word) < 4
        ORDER BY score, word`
      break
    case 'soundex':
      // requires fuzzy extension, 4 is an exact soundex match, which may not be an exact match
      // it is good for matching similar sounding names, difference is a convenience function to compare soundex results
      sql = SQL` SELECT word, difference(${needle}, word) score
        FROM food_words
        WHERE difference(${needle}, word) = 4`
      break
    case 'metaphone':
      // fuzzy again, using double metaphone to compare english and foreign sounding words
      sql = SQL` SELECT word, 1
        FROM food_words
        WHERE (dmetaphone(${needle}) = dmetaphone(word))
          OR (dmetaphone_alt(${needle}) = dmetaphone_alt(word))`
      break
    default:
      // similarity
      break
  }

  const res = await pg.query(sql)
  return formatRows(res.rows)
}

const getById = async (pg, { id }) => {
  const res = await pg.query(SQL`
    SELECT id, name, food_group_id, created, modified FROM food WHERE id = ${id}`)
  return formatRows(res.rows)[0]
}

const getAll = async (pg, { offset, limit }) => {
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
    RETURNING id, name, food_group_id`
    : SQL`INSERT INTO food (name, food_group_id)
    VALUES (${food.name},
       (SELECT id FROM food_group WHERE name = ${food.foodGroup}))
      RETURNING id, name, food_group_id`
  const res = await pg.query(sql)
  const updated = formatRows(res.rows)[0]
  return {
    id: updated.id,
    typeName: 'Food',
    operation: 'create',
    count: res.rowCount,
    updated
  }
}

const update = async (pg, { food }) => {
  const res = await pg.query(SQL`UPDATE food
  SET name = ${food.name}, food_group_id = ${food.foodGroupId}, modified = now()
  WHERE id = ${food.id}`)
  const updated = await getById(pg, food)
  return {
    id: food.id,
    typeName: 'Food',
    operation: 'update',
    count: res.rowCount,
    updated
  }
}

const deleteFoods = async (pg, { ids }) => {
  const res = await pg.query(SQL`
    DELETE FROM food WHERE id = ANY(${[ids]}::text[])`)
  return { ids, typeName: 'Food', operation: 'delete', count: res.rowCount }
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
