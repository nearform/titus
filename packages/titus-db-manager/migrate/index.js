const migrate = async pg => {
  await pg.migrate()

  console.log('Database migrated')
}

module.exports = migrate
