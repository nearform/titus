# Titus Backend Kit
## Overview
Titus backend is a starter [fastify] server with [PostgreSQL][node-postgres] and [Auth0] plugins.

What you implement with Titus backend is your choice. We provide an unopinionated, working shell.
We provide what is common in our projects: a configurable HTTP Server with JSON logging, health check route and database capabilities.

There is scope for you to add, customise and even replace plugins and features.

### Organisation
Titus backend is structured as follows:

* `lib/` - contains the server sources
* `lib/config` - server configuration: reads environment variable values, with default values from the`.env` file
* `lib/plugins` - fastify plugins for cross-cutting features. Contains a pg instrumenter and Auth0 + [jwt] strategy
* `lib/routes` - fastify plugins to declare HTTP routes. The health check route is also here
* `tools/` - contains tooling, such as database migration tools and scripts

### Auth0 Plugin

The Auth0 plugin declares a `POST /login` route, which expects a JSON body with `username` and `password` keys.
These values are passed to [Auth0] and if authentication succeeds, you get a [jwt] in return that your application must store.

It also declares a fastify authentication [strategy] named `jwt`. Use this in the route you would like to protect.
Accessing these routes requires a valid jwt value in the `Authorization` HTTP header.

Have a look at `lib/plugins/auth0/auth0.test.js` for some examples.

### Azure AD Plugin

This adds JWT validation and getting the requesting user through Microsoft Graph, to the routes specified in `lib/config/auth-routes.js`.

It expects to be supplied an `Authorization` header as `Bearer ${IDTOKEN}`.

It requires the `AD_*` env vars to be set in `.env`.

### The pg Plugin

The pg plugin automatically instruments other routes with a [pg][fastify-postgres] so they can issue queries against the database.

Have a look at `lib/plugins/pg/pg.test.js` for some examples.

### Health Check Route

The `GET /healthcheck` endpoint is intended for your production cluster. Your backend is ready to use when
it returns your application version and server timestamp. It also runs a dummy query against the database, to ensure it's available.


## Install the Backend
To install Titus backend, run the following command:

```
npm install
```

**Note** The Titus backend is automatically installed if you previously ran `npm install` at root level.



## Run the Backend Locally
To run your application locally, perform the following steps:

1. Edit your configuration
  ```
  npm run create:env
  ```

  This creates a `.env` file in the root directory, based on the `.env.sample` file.
  These are your configuration values. You can amend the file when running locally, and also override individual variables in your environment.

  You must edit the `.env` file to set the `AUTH0_*` variables with the data from your Auth0 app, if you need to use it for authentication.

1. Make sure PostgreSQL is running and available. If you ran `npm run start:all` at root level, [docker-compose] took care of it.

1. Start the server
  ```
  npm start
  ```

  This starts your server on `http://localhost:5000`.
  If you make any changes in `lib/` or in `.env`, the server automatically restarts.

  Verify your application works and can reach the database using the command `curl http://127.0.0.1:5000/healthcheck`.


## Test and Lint the Backend
Use the following commands to test and lint your application:

* `npm test` - run all the tests with code coverage (this is the command CI uses)
* `npm run test:watch` - start Jest in watch mode: it runs tests against the modified files (since last commit), and automatically runs them again if you change the code.
* `npm run lint` - apply ESLint / Prettier on sources
* `npm run lint:fix` - use ESLint / Prettier (with the autofix flag)


## Manage the Backend Database
The following commands can be used with your Titus backend database:

* `npm run db:init` - apply SQL initialisation scripts with `psql` CLI against your database
* `npm run db:migrate` - apply database migration scripts from `tools/migrations/build` with [postgrator]
* `npm run db:seed` - seed the database with dev data from `tools/migrations/seed_dev` with [postgrator]

## Multi-tenancy with AWS Amplify
The first step is to add a property to Cognito users, to be able to distinguish their tenancy.

In the Cognito User Pool's settings, under `Attributes`, [you can add a custom attribute](aws-custom-attributes). For example it could be `custom:schema`, which is then `schemaA` or `schemaB`.

You will then need to send the AWS Amplify `accessToken`'s `jwtToken` and `username` from the front-end, for validation by the back-end. e.g.
```
import Auth from '@aws-amplify/auth'
...
const headers = {}
const {
  accessToken: { jwtToken, payload: { username } }
} = await Auth.currentSession()
headers.Authorization = `${username}:${jwtToken}`
const response = await fetch('/foobar', { headers })
```

[AWS provides instructions](aws-jwt-validation) on how to validate the `jwtToken` in the back-end.

You can then get the user's data to determine which schema to use. e.g.
```
const { CognitoIdentityServiceProvider } = require('aws-sdk')
...
const cognito = new CognitoIdentityServiceProvider()
const params = {
  UserPoolId: AWS_POOL_ID,
  Username: 'foobar'
}
cognito.adminGetUser(params, (err, response) => {
  if (err) {
    throw err
  }
  const { UserAttributes } = response
  const schema = UserAttributes.find(a => a.Name === 'custom:schema').Value
  ...
})
```



[Jest]: https://jestjs.io
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[Standard]: https://standardjs.com
[fastify]: https://fastify.io
[Pino]: http://getpino.io
[Auth0]: https://auth0.com
[Nodemon]: https://nodemon.io
[fastify-postgres]: https://github.com/fastify/fastify-postgres
[jwt]: https://jwt.io
[nock]: https://github.com/nock/nock#readme
[faker]: http://marak.github.io/faker.js
[postgrator]: https://github.com/rickbergfalk/postgrator#readme
[docker-compose]: https://docs.docker.com/compose
[aws-custom-attributes]: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
[aws-jwt-validation]: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

