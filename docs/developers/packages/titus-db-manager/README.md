# Titus Database Manager Package
## Overview
The Titus database manager is a starter PostgreSQL database.

What you implement with Titus database is your choice. We provide an working manager database.
We provide what is common in our projects.

There is scope for you to add, customise and even replace plugins and features.

### Organisation
The Titus database manager is structured as follows:

* `src/index.js` - main entry points and runs the database actions.
* `docker/Dockerfile` - contains files to run the database a container.
* `migrate/` - contains the sql migration.
* `seed/` - contains files to seed the database.
* `truncate/` - contains files to truncate the database.

## Install Packages
To install Titus Database manager, run the following command:

```
npm install
```

**Note:** The Titus backend is automatically installed if you previously ran `npm install` at root level.

## Run the Database Manager
To run your application locally, perform the following steps:
```sh
npm run db:up
```

The command `docker ps` produces a log of the running set of containers, in our case, the PostgreSQL database. For example:

```sh
CONTAINER ID        IMAGE                         NAMES
e553c840fbdc        postgres:10.4-alpine          titus-db
```

Use the command `docker volume ls` to list the volume created to handle Titus PostgreSQL data as follows:

```sh
DRIVER              VOLUME NAME
local               titus_titus-pg-data

```

## Test and Lint the Database Manager
Use the following commands to test and lint your application:

| Command | Description |
| ----------- | ----------- |
|`npm test` | Run all the tests with code coverage. This is the command CI uses, |
|`npm run test:watch` | Start Jest in watch mode. It runs tests against the modified files (since last commit), and automatically runs them again if you change the code.|
|`npm run lint` | Apply ESLint / Prettier on sources.|
|`npm run lint:fix`| Use ESLint / Prettier (with the autofix flag).|


## Manage the Database
Use the following commands with your Titus database:

| Command | Description |
| ----------- | ----------- |
|`npm run db:up` | Build, (re)create, start, and attach to containers for a service.|
|`npm run db:down` | Stop containers and remove containers, networks, volumes, and images.|
|`npm run db:delete` | Remove volume. You cannot remove a volume that is in use by a container. |
|`npm run db:migrate` | Apply database migration scripts from `tools/migrations/build` with [postgrator].|
|`npm run db:seed` | Seed the database with dev data from `tools/migrations/seed_dev` with [postgrator].|
|`npm run db:truncate` | Apply SQL truncate scripts with `psql` CLI against your database.|

### Database `schema`

Optionally, you can provide to the `db:migrate` two extra positional arguments:

```bash
npm run db:migrate [schema] [directory]
# eg: npm run db:migrate titus-app /titus-app
```

- schema: the database's schema to migrate. Default is [`public`](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PUBLIC).
- migrations' directory: where the migration scripts are located. Default `/migrations`

[Jest]: https://jestjs.io
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[faker]: http://marak.github.io/faker.js
[postgrator]: https://github.com/rickbergfalk/postgrator#readme
[docker-compose]: https://docs.docker.com/compose
