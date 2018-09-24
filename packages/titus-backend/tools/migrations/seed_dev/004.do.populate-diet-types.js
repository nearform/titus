'use strict'

module.exports.generateSql = function () {
  return `
    INSERT INTO diet_type (name, visible) values
    ('Carnivorous', TRUE),
    ('Ketogenic', FALSE),
    ('Omnivorous', TRUE),
    ('Pescetarian', TRUE),
    ('Vegetarian', FALSE),
    ('Vegan', TRUE),
    ('Jewish', TRUE),
    ('Islamic', TRUE),
    ('Hindu', TRUE),
    ('Paleolithic', FALSE),
    ('Fruitarian', TRUE)
  `
}
