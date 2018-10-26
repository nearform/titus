'use strict'

module.exports.generateSql = function() {
  return `
    INSERT INTO users (id, name, org_id, metadata) values
    ('MrsAdmin', 'Mrs Admin', 'ROOT', null),
    ('MissEditor', 'Miss Editor', 'ROOT', null),
    ('MrUser', 'Mr User', 'ROOT', null);

    INSERT INTO policies (id, version, name, org_id, statements) values
    ('policyId15', 0.1, 'Admin', 'ROOT', '{ "Statement": [{
        "Effect": "Allow",
        "Action": ["read"],
        "Resource": ["dietaryTypes"]
      },
      {
        "Effect": "Allow",
        "Action": ["delete"],
        "Resource": ["dietaryTypes"]
      },
      {
        "Effect": "Allow",
        "Action": ["visibility"],
        "Resource": ["dietaryTypes"]
      }
    ]}'::JSONB),
    ('policyId16', 0.1, 'Editor', 'ROOT', '{ "Statement": [{
        "Effect": "Allow",
        "Action": ["read"],
        "Resource": ["dietaryTypes"]
      },
      {
        "Effect": "Deny",
        "Action": ["delete"],
        "Resource": ["dietaryTypes"]
      },
      {
        "Effect": "Allow",
        "Action": ["visibility"],
        "Resource": ["dietaryTypes"]
      }
    ]}'::JSONB),
    ('policyId17', 0.1, 'User', 'ROOT', '{ "Statement": [{
        "Effect": "Allow",
        "Action": ["read"],
        "Resource": ["dietaryTypes"]
      },
      {
        "Effect": "Deny",
        "Action": ["delete"],
        "Resource": ["dietaryTypes"]
      },
      {
        "Effect": "Deny",
        "Action": ["visibility"],
        "Resource": ["dietaryTypes"]
      }
    ]}'::JSONB);

    INSERT INTO user_policies (user_id, policy_id)
      SELECT 'MrsAdmin', id FROM policies WHERE name = 'Admin'
    UNION
      SELECT 'MissEditor', id FROM policies WHERE name = 'Editor'
    UNION
      SELECT 'MrUser', id FROM policies WHERE name = 'User';

  `
}
