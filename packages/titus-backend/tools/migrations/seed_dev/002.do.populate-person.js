'use strict'

module.exports.generateSql = function () {
  return `
      INSERT INTO person
        (first_name, last_name, race_id)
      VALUES
        ('Frodo', 'Baggins', (SELECT id FROM race WHERE name = 'Hobbit')),
        ('Samwise', 'Gamgee', (SELECT id FROM race WHERE name = 'Hobbit')),
        ('Aragorn', 'Son of Arathorn', (SELECT id FROM race WHERE name = 'Human')),
        ('Legolas', NULL, (SELECT id FROM race WHERE name = 'Elf')),
        ('Gimli', 'Son of Glóin', (SELECT id FROM race WHERE name = 'Dwarf')),
        ('Boromir', 'Son of Denethor', (SELECT id FROM race WHERE name = 'Human')),
        ('Meriadoc', 'Brandybuck', (SELECT id FROM race WHERE name = 'Hobbit')),
        ('Peregrin', 'Took', (SELECT id FROM race WHERE name = 'Hobbit')),
        ('Gandalf', 'the Grey', (SELECT id FROM race WHERE name = 'Wizard'))
    `
}
