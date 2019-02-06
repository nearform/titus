'use strict'

module.exports.generateSql = function() {
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
      ALTER TABLE food
        ADD COLUMN sys_period tstzrange NOT NULL DEFAULT tstzrange(current_timestamp, null);
      CREATE TABLE food_history (LIKE food);
      CREATE TRIGGER food_versioning_trigger
        BEFORE INSERT OR UPDATE OR DELETE ON food
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        'sys_period', 'food_history', true
        );
      CREATE TABLE diet_type
      (
          id char(36) NOT NULL DEFAULT gen_random_uuid(),
          created timestamp NOT NULL DEFAULT now(),
          modified timestamp,
          name text NOT NULL,
          visible boolean,
          PRIMARY KEY (id)
      );
    `
}
