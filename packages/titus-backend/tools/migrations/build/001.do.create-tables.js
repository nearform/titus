'use strict'

module.exports.generateSql = function () {
  return `
      CREATE TABLE food_group
      (
          id char(36) NOT NULL DEFAULT gen_random_uuid(),
          created timestamp NOT NULL DEFAULT now(),
          modified timestamp,
          name text NOT NULL,
          PRIMARY KEY (id)
      );
      CREATE TABLE food
      (
          id char(36) NOT NULL DEFAULT gen_random_uuid(),
          created timestamp NOT NULL DEFAULT now(),
          modified timestamp,
          name text NOT NULL,
          food_group_id char(36) NOT NULL references food_group(id),
          PRIMARY KEY (id)
      );
    `
}
