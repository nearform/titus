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
      CREATE TABLE diet_type
      (
          id char(36) NOT NULL DEFAULT gen_random_uuid(),
          created timestamp NOT NULL DEFAULT now(),
          modified timestamp,
          name text NOT NULL,
          visible boolean,
          PRIMARY KEY (id)
      );
      CREATE TABLE trails
      (
          id            BIGSERIAL PRIMARY KEY,
          "when"        TIMESTAMP WITHOUT TIME ZONE,

          who_id        VARCHAR(255) NOT NULL,
          what_id       VARCHAR(255) NOT NULL,
          subject_id    VARCHAR(255) NOT NULL,
          who_data      JSONB DEFAULT '{}',
          what_data     JSONB DEFAULT '{}',
          subject_data  JSONB DEFAULT '{}',

          "where"       JSONB DEFAULT '{}',
          why           JSONB DEFAULT '{}',
          meta          JSONB DEFAULT '{}'
      );

      CREATE INDEX trails_timestamp ON trails("when");
      CREATE INDEX trails_who_id ON trails(who_id);
      CREATE INDEX trails_what_id ON trails(what_id);
      CREATE INDEX trails_subject_id ON trails(subject_id);
    `
}
