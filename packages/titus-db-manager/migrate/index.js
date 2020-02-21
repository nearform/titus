const migrate = async pg => {
  await pg.migrate()

  console.log('Database migrated')
  return true
}

module.exports = migrate
