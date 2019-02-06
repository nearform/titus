# Titus Backend

A starter Hapi and PostgreSQL setup running in Docker.

## Features

* Docker compose config to start database and Hapi
* Uses host filesystem, so no need to restart containers on code change
* Hot reloading Hapi server
* Postgresql Hapi plugin with transaction control
* Sample source structure for organising Hapi
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