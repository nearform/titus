const Pool = require('pg-pool')

let pool = false

const connect = () => {
  if (pool) {
    return true
  }
  pool = new Pool()
  console.log(`Connected to PostgreSQL`)
  return true
}

const disconnect = async () => {
  if (!pool) {
    return true
  }
  await pool.end()
  pool = false
  console.log(`Disconnected from PostgreSQL`)
  return true
}

const query = (sql, params = []) => {
  connect()
  return pool.query(sql, params)
}

module.exports = {
  connect,
  disconnect,
  pool,
  query
}
