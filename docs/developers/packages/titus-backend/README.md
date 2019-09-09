# Titus Backend

Titus backend is starter [Hapi] server with [PostgreSQL][node-postgres] and [Auth0] plugins.

## Features

Titus backend consists of the following:

* Hapi HTTP server 
* [Pino] logger
* Automatic restart and hot reloading with [NodeMon]
* [12-Factor App recommendation][config] and reads configuration from environment variables 
* PostgreSQL plugin with transaction control at route level
* Sample source structure for organising Hapi routes and plugin
* [Jest], [nock] and [faker] test tools
* [ESLint] code linter
* [Prettier] code formatter with [Standard] preset


## Introduction
 

What you implement with Titus backend is your choice, we provide you with an unopiniated working shell to get started.
We provide what is common in our projects: a configurable HTTP Server with JSON logging, health check route and database capabilities.

There is scope for you to add, customise and even replace features and plugins.

### Organisation
Titus backend is structured as follows:

* `lib/` - contains the server sources
* `lib/config` - server configuration: reads environment variable values, with default values from the `.env` file
* `lib/plugins` - hapi plugins for cross-cutting features. Contains PG instrumenter and Auth0 + [jwt] strategy
* `lib/routs` - Hapi plugins declaring HTTP routes. You'll find the health-check there
* `tools/` - contains tooling not used by the server itself, but related to it, such as database migration tools and scripts

### Auth0 Plugin

The Auth0 plugin declares a `POST /login` route, which expects a JSON body with `username` and `password` keys.
Those values are passed to [Auth0] and if authentication succeeds, you get a [jwt] in return that your application should store.

The Auth0 plugin also declares a hapi authentication [strategy] named `jwt`. Use this in the routes you would like to protect.
Accessing these routes requires a valid jwt value in the `Authorization` HTTP header.

Have a look at `lib/plugins/auth0/auth0.test.js` for some examples.

### Pg Plugin

The Pg plugin automatically instruments other routes with a [pg][node-postgres] so they can issue queries against the database.
It automatically commits (or rolls back, in case of thrown errors) transactionnal routes.

To enable it, include `plugins: { pgPlugin: {} }` to your route `options`
To enable transactional support set the transactional to true as follows: `plugins: { pgPlugin: { transactional: true } }`

Have a look at `lib/plugins/pg/pg.test.js` for some examples.

### Health Check Route

The `GET /healthcheck` endpoint is intended for your production cluster. It tells your backend is ready to use when
it returns your application version and server timestamp. It also runs a dummy query against the database, to ensure it is available.


## Installation
To install Titus backend, run the following command:

```
npm install
```

**Note** The Titus backend is automatically installed if you previously ran `npm install` at root level.


## Running Locally
To run your application locally, perform the following steps:

1. Edit your environment configuration:
  ```
  npm run create:env
  ```

  This creates a `.env` file in the root directory based on the `.env.sample` file.
  These are your configuration values. You can ammend the file when running locally, and also override individual variables in your environment.

  You must edit the `.env` to fill in the `AUTH0_*` variables with the data from your Auth0 app, if you need to use it for authentication.

1. Make sure PostgreSQL is running and available. If you ran `npm run start:all` at root level, [docker-compose] took care of it.

1. Start the server
  ```
  npm start
  ```
  
  This starts your server on `http://localhost:5000`. 
  If you make any changes in `lib/` or in `.env` the server automatically restarts. 

  Verify the application works and can reach the database using the command `curl http://127.0.0.1:5000/healthcheck`.


## Testing and Linting
The following commands can be used for testing and linting your application:

* `npm test` - run all the tests with code coverage (it's the command CI is using)
* `npm run test:watch` - start Jest in watch mode: run tests against the modified files (since last commit), and automatically runs them again if you change the code 
* `npm run lint` - apply ESLint / Prettier to sources
* `npm run lint:fix` - use ESLint / Prettier (with autofix flag)


## Database Management
The following commands can be used with your Titus backend database:

* `npm run db:init` - apply SQL initialisation scripts with `psql` CLI against your database
* `npm run db:migrate` - apply database migration scripts from `tools/migrations/build` with [postgrator] 
* `npm run db:seed` - seed the database with dev data from `tools/migrations/seed_dev` with [postgrator]


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
