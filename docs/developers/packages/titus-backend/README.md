# Titus Backend

A starter Hapi and PostgreSQL setup running in Docker.

## Features

* Docker compose config to start database and Hapi
* Uses host filesystem, so no need to restart containers on code change
* Hot reloading Hapi server
* Web-based Postgresql ui using [Adminer](https://www.adminer.org/)
* Graphql with sample schema and associated db migrations and seed
* Postgresql Hapi plugin with transaction control
* Sample source structure for organising Hapi and Graphql components
* Sample test setup using Jest
* Linting using eslint/Standard

## Getting started

Run `npm run start`, this will build and run all the necessary docker containers. 

Verify it works with `curl http://127.0.0.1:5000/hello/random`

You can tail the server logs with `docker logs -f docker_api_1`.

## API documentation

Setting the `NODE_ENV` to `development`, you will be able to access the API `swagger` documentation at [http://127.0.0.1:5000/documentation](http://127.0.0.1:5000/documentation). This is set by default when you use `npm run start`

## Developing

`npm run start` will run everything in local development mode. Any code changes you make will automatically restart the server. 

Titus uses Docker Compose, see [docker/docker-compose-dev.yml](docker/docker-compose-dev.yml).

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

### Adminer

[Adminer](https://www.adminer.org/) provides a handy web ui for the postgres db which you can access by opening http://localhost:8080.

* Change 'System' to be 'PostgreSQL'.
* You can then log in with: `titus` as user, password and database.


### Trail

Audit trails are available using [nearForm's Trail service](https://github.com/nearform/trail).

You can navigate to http://localhost:5000/hello in your browser to add an audit trail item to the database.

To view audit trail items navigate to [](http://localhost:5000/trails?from=<date-from>&to=<date-to>), where `<date-from>` and `<date-to>` are ISO 8601 formatted dates, e.g. http://localhost:5000/trails?from=2017-07-06T12%3A34%3A56.123&to=2018-07-06T12%3A34%3A56.123
