const { query } = require('./pg')

const get = async id => {
  let sql = `SELECT *, to_char(published, 'YYYY-MM-DD') as published FROM books`
  const params = []
  if (id) {
    sql += ' WHERE id=$1'
    params.push(id)
  }
  const results = await query(sql, params)
  return results.rows
}

module.exports = { get }
