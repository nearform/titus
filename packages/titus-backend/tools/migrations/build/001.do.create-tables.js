'use strict'

module.exports.generateSql = function () {
  return `
      CREATE TABLE race
      (
          id char(36) NOT NULL DEFAULT gen_random_uuid(),
          created timestamp NOT NULL DEFAULT now(),
          modified timestamp,
          name text NOT NULL,
          PRIMARY KEY (id)
      );
      CREATE TABLE person
      (
          id char(36) NOT NULL DEFAULT gen_random_uuid(),
          created timestamp NOT NULL DEFAULT now(),
          modified timestamp,
          first_name text NOT NULL,
          last_name text,
          race_id char(36) NOT NULL REFERENCES race (id),
          PRIMARY KEY (id)
      );
    `
}
