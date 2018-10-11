const SQL = require('@nearform/sql')
const camelize = require('camelize')

const getSql = ({ needle, keywordType }) => {
  switch (keywordType) {
    case 'startsWith':
      return SQL`
        SELECT
          word,
          1
        FROM food_words
        WHERE word ILIKE(${needle + '%'})
        ORDER BY LENGTH(word), word
      `
    case 'contains':
      return SQL`
        SELECT
          word,
          1
        FROM food_words
        WHERE word ILIKE(${'%' + needle + '%'})
        ORDER BY LENGTH(word), word
      `
    case 'endsWith':
      return SQL`
        SELECT
          word,
          1
        FROM food_words
        WHERE word ILIKE(${'%' + needle})
        ORDER BY LENGTH(word), word
      `
    case 'levenshtein':
      // requires fuzzy extension, basically a fuzzy search, not as efficient as trigram
      // this might be better calculated as a percentage e.g. abc vs abd should be further
      // scored far less than abcdefg vs abddefg, we're just giving back distance, there are a few variants
      return SQL`
        SELECT
          word,
          levenshtein(${needle}, word) score
        FROM food_words
        WHERE levenshtein(${needle}, word) < 4
        ORDER BY score, word
      `
    case 'soundex':
      // requires fuzzy extension, 4 is an exact soundex match, which may not be an exact match
      // it is good for matching similar sounding names, difference is a convenience function to compare soundex results
      return SQL`
        SELECT
          word,
          difference(${needle}, word) score
        FROM food_words
        WHERE difference(${needle}, word) = 4
      `
    case 'metaphone':
      // fuzzy again, using double metaphone to compare english and foreign sounding words
      return SQL`
        SELECT
          word,
          1
        FROM food_words
        WHERE (dmetaphone(${needle}) = dmetaphone(word))
        OR (dmetaphone_alt(${needle}) = dmetaphone_alt(word))
      `
    default:
      // defaulting to trigram distance, same as 1-similarity
      return SQL`
        SELECT
          word,
          word <-> ${needle} score
        FROM food_words
        WHERE word <-> ${needle} < 0.7
        ORDER BY SCORE
      `
  }
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  return camelize(result.rows)
}
