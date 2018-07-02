'use strict'

module.exports.generateSql = function () {
  return `
      INSERT INTO race
        (name)
      VALUES
        ('Hobbit'),
        ('Human'),
        ('Elf'),
        ('Dwarf'),
        ('Wizard')
    `
}
