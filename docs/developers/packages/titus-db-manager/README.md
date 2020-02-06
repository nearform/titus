# Titus Database Manager Kit
## Overview
Titus Database manager is a starter [PostgreSQL] database.

What you implement with Titus Database is your choice. We provide an working manager database.
We provide what is common in our projects.

There is scope for you to add, customise and even replace plugins and features.

### Organization
Titus database manager is structured as follows:

* `src/index.js` - main entry points and runs the database actions
* `docker/Dockerfile` - 
* `migrate/` - contains the sql migration
* `seed/` - 
* `truncate/` - contains the action that truncate the database

## Install packages
To install Titus Database manager, run the following command:

```
npm install
```

**Note** The Titus backend is automatically installed if you previously ran `npm install` at root level.

## Run the database manager
To run your application locally, perform the following steps:

## Test and Lint the Database manager
Use the following commands to test and lint your application:

* `npm test` - run all the tests with code coverage (this is the command CI uses)
* `npm run test:watch` - start Jest in watch mode: it runs tests against the modified files (since last commit), and automatically runs them again if you change the code.
* `npm run lint` - apply ESLint / Prettier on sources
* `npm run lint:fix` - use ESLint / Prettier (with the autofix flag)

## Manage the Database
The following commands can be used with your Titus database:

* `npm run db:up` - Builds, (re)creates, starts, and attaches to containers for a service
* `npm run db:down` - Stops containers and removes containers, networks, volumes, and images created by up
* `npm run db:delete` - Remove volume. You cannot remove a volume that is in use by a container
* `npm run db:migrate` - apply database migration scripts from `tools/migrations/build` with [postgrator]
* `npm run db:seed` - seed the database with dev data from `tools/migrations/seed_dev` with [postgrator]
* `npm run db:truncate` - apply SQL truncate scripts with `psql` CLI against your database




[Jest]: https://jestjs.io
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[faker]: http://marak.github.io/faker.js
[postgrator]: https://github.com/rickbergfalk/postgrator#readme
[docker-compose]: https://docs.docker.com/compose
