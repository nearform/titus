const truncate = async pg => {
  await pg.query(`
    TRUNCATE TABLE
      some_table
    RESTART IDENTITY;
  `)

  console.log('Database truncated')
}

module.exports = truncate
