# Titus Backend Package
## Overview
Titus backend is a starter [fastify] server with [node-postgres] and [Auth0] plugins.

What you implement with Titus backend is your choice. We provide an unopinionated, working shell.
We provide what is common in our projects: a configurable HTTP Server with JSON logging, health check route and database capabilities.

There is scope for you to add, customise and even replace plugins and features.

### Organisation
Titus backend is structured as follows:

* `lib/` - contains the server sources.
* `lib/config` - server configuration: reads environment variable values, with default values from the`.env` file.
* `lib/plugins` - fastify plugins for cross-cutting features. Contains a pg instrumenter and Auth0 + [jwt] strategy.
* `lib/routes` - fastify plugins to declare HTTP routes. The health check route is also here.

### Database

There's a separate package for the database, make sure it's running before continuing.
See the [Titus Database Manager] section for details.

### Auth0 Plugin

The Auth0 plugin declares a `POST /login` route, which expects a JSON body with `username` and `password` keys.
These values are passed to [Auth0] and if authentication succeeds, you get a [jwt] in return that your application must store.

It also declares a fastify authentication [strategy] named `jwt`. Use this in the route you would like to protect.
Accessing these routes requires a valid jwt value in the `Authorization` HTTP header.

Refer to `lib/plugins/auth0/auth0.test.js` for some examples.

### Azure AD Plugin

This adds JWT validation and gets the requesting user through Microsoft Graph to the routes specified in `lib/config/auth-routes.js`.

It expects to be supplied an `Authorization` header as `Bearer ${IDTOKEN}`.

It requires the `AD_*` env vars to be set in `.env`.

### The pg Plugin

The pg plugin automatically instruments other routes with a [pg][fastify-postgres] so they can issue queries against the database.

Have a look at `lib/plugins/pg/pg.test.js` for some examples.

### Health Check Route

The `GET /healthcheck` endpoint is intended for your production cluster. Your backend is ready to use when
it returns your application version and server timestamp. It also runs a dummy query against the database to ensure it's available.


## Install the Backend
To install Titus backend, run the following command:

```
npm install
```

**Note:** The Titus backend is automatically installed if you previously ran `npm install` at root level.


## Start the Server
To start Titus backend, run the following command:

  ```
  npm start
  ```

  This starts your server on `http://localhost:5000`.
  If you make any changes in the `lib/` directory or in the `.env` file, the server automatically restarts.

  Verify your application works and that you can reach the database using the command: `curl http://127.0.0.1:5000/healthcheck`.


## Test and Lint the Backend
Use the following commands to test and lint your application:

| Command | Description |
| ------ | ------- |
| `npm test` | Run all the tests with code coverage (this is the command CI uses). |
| `npm run test:watch` | Start Jest in watch mode: it runs tests against the modified files (since last commit), and automatically runs them again if you change the code.|
| `npm run lint` | Apply ESLint / Prettier on sources. |
| `npm run lint:fix` | Use ESLint / Prettier (with the autofix flag). |


## Multi-tenancy with AWS Amplify
The first step is to add a property to Cognito users, to be able to distinguish their tenancy.

In the Cognito User Pool's settings, under `Attributes`, you can add a [custom attribute]. For example, `custom:schema`, which is then `schemaA` or `schemaB`.

You then need to send the AWS Amplify `accessToken`'s `jwtToken` and `username` from the frontend, for validation by the backend. For example:
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

AWS provides [validation instructions] on how to validate the `jwtToken` in the backend.

You can then get the user's data to determine which schema to use. For example:
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
[custom attribute]: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
[validation instructions]: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
[Titus Database Manager]: /developers/packages/titus-db-manager/
