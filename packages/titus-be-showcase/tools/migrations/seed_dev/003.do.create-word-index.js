'use strict'

module.exports.generateSql = function() {
  return `CREATE TABLE food_words AS SELECT word FROM
    ts_stat('SELECT to_tsvector(''simple'', name) FROM food');
    CREATE INDEX food_words_index ON food_words USING gin(word gin_trgm_ops);
  `
}
