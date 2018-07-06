# Titus Backend

A starter Hapi and PostgreSQL setup running in Docker.

## Currently implemented for local dev

* Docker compose config to start database and Hapi
* Uses host filesystem, so no need to restart containers on code change
* Hot reloading Hapi server
* Web-based Postgresql ui using adminer
* Graphql with sample schema and associated db migrations and seed
* Postgresql Hapi plugin with transaction control
* Sample source structure for organising Hapi and Graphql components
* Sample test setup using Jest
* Linting using eslint/Standard

## Developing

### Docker

`docker:dev:start` - start the db, api and web db ui in Docker for local development.  This will also migrate and seed the db.
`docker:dev:stop` - stop all development Docker containers

#### Other useful script

`docker:dev:migrate` - migrate the db
`docker:dev:seed` - seed the db with dev data
`docker:dev:rmi` - remove all development Docker images
`docker:dev:logs` - show and follow all development Docker logs
`docker:dev:exec` - execute a command in the dev api Docker container, e.g. `npm run docker:dev:exec -- ls`

### API

`dev:start` - start the Hapi server on the host machine (used inside the Docker container)
`dev:cleandb` - deletes the `pgdata` directory containing the database data. THIS WILL DELETE YOUR DATABASE!

### Linting

`lint` - uses eslint / prettier
`lint:fix` - uses eslint / prettier (with autofix flag)

### Testing

`test` - run tests using Jest

## Adminer

This provides a web ui for the postgres db on http://localhost:8080
You can log in with: `titus` as user, password and database.

## Trail

Audit trails are available using [nearForm's Trail service](https://github.com/nearform/trail).

You can navigate to http://localhost:5000/hello in your browser to add an audit trail item to the database.

To view audit trail items navigate to http://localhost:5000/trails?from=<date-from>&to=<date-to>, where `<date-from>` and `<date-to>` are ISO 8601 formatted dates, e.g. http://localhost:5000/trails?from=2017-07-06T12%3A34%3A56.123&to=2018-07-06T12%3A34%3A56.123
