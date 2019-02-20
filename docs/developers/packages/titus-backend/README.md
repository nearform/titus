# Titus Backend

A starter [Hapi] server with [PostgreSQL][node-postgres] and [Auth0] plugins.

## Features

* Provides Http server with Hapi
* Logger of choice is [Pino]
* Automatic restart and hot reloading thanks to [NodeMon]
* Follow [12-Factor App recommendation][config] and reads configuration from env variables 
* Postgresql plugin with transaction control at route level
* Sample source structure for organising Hapi routes and plugin
* Tested with [Jest], [nock] and [faker]
* Code linter is [ESLint]
* Code formatted is [Prettier] with [Standard] preset


## Introduction

Titus-backend is lightweight on purpose. 

What you'll implement with it is your own business, and we're providing you an unopiniated, working shell.
We only provide what we think is common in our projects: a configurable Http Server, with JSON logging, health check route and database capabilities.

There's room for you to add, customize or even replace parts and bits.

### Organization

* `lib/` - contains the server sources
* `lib/config` - server configuration: read values from env variables, with default values from `.env` file
* `lib/plugins` - Hapi plugins for cross-cutting features. Contains PG instrumenter and Auth0 + [jwt] strategy
* `lib/routs` - Hapi plugins declaring HTTP routes. You'll find the health-check there
* `tools/` - contains tooling not used by the server itself, but related to it, such as database migration tools and scripts

### Auth0 plugin

It declares `POST /login` route, which expects JSON body with `username` and `password` keys.
Those values will be sent to [Auth0] and if authentication succeeded, you'll get a [jwt] in return, that your application should store.

It also declared an Hapi authentication [strategy] named `jwt`. Use in in the route you'd like to protect.
Accessing those routes will require a valid jwt value in `Authorization` HTTP header.

Have a look at `lib/plugins/auth0/auth0.test.js` for some examples.

### Pg plugin

It automatically instrument other routes with a [pg][node-postgres] so they could issue queries against database.
It automatically commits (or rolls back, in case of thrown errors) transactionnal routes.

To enable it, include `plugins: { pgPlugin: {} }` to your route `options`
To enable transactional support: `plugins: { pgPlugin: { transactional: true } }`

Have a look at `lib/plugins/pg/pg.test.js` for some examples.

### Health check route

`GET /healthcheck` endpoint is intended to your production cluster, as it tells when your backend is ready to use.
It returns your application version and server timestamp, but also run a dummy query against database, to be sure it's available.


## Installation

```
npm install
```

But it was covered when you ran `npm install` at root level ;)


## Running Locally

1. Edit your configuration:
  ```
  npm run create:env
  ```

  This will create a `.env` file inside the root directory, from the `.env.sample` file.
  These are your configuration values. You can ammend the file when running locally, and also override individual variables in your environement.

  You must fill in the `AUTH0_*` variables with the data from your Auth0 app, may you need to use it for authentication.

1. Make sure Postgres is running and available. If you've ran `npm run start:all` at root level, [docker-compose] took care of it.

1. Start the server
  ```
  npm start
  ```
  
  This will start your server on `http://localhost:5000`. 
  Any changes in `lib/` or in `.env` you make will automatically restart the server. 

  Verify it works and can reach its DB with `curl http://127.0.0.1:5000/healthcheck`.


## Testing and Linting

* `npm test` - run all the tests with code coverage (it's the command CI is using).
* `npm run test:watch` - starts Jest in watch mode: it'll run tests against the modified files (since last commit), and will automatically run them again on code change.
* `npm run lint` - apply ESLint / Prettier on sources
* `npm run lint:fix` - uses ESLint / Prettier (with autofix flag)


## Database management

* `npm run db:init` - apply SQL initialization scripts with `psql` CLI against your database
* `npm run db:migrate` - apply DB migration scripts from `tools/migrations/build` with [postgrator] 
* `npm run db:seed` - seed the DB with dev data from `tools/migrations/seed_dev` with [postgrator]


[Jest]: https://jestjs.io
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[Standard]: https://standardjs.com
[Hapi]: https://hapijs.com
[Pino]: http://getpino.io
[Auth0]: https://auth0.com
[NodeMon]: https://nodemon.io
[node-postgres]: https://node-postgres.com
[jwt]: https://jwt.io
[nock]: https://github.com/nock/nock#readme
[faker]: http://marak.github.io/faker.js
[postgrator]: https://github.com/rickbergfalk/postgrator#readme
[docker-compose]: https://docs.docker.com/compose
[config]: https://12factor.net/config
[strategy]: https://hapijs.com/tutorials/auth?lang=en_US#strategies