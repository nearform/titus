# Quick Start Guide

Titus is easy to install and run. We encourage developers to install Titus locally themselves - it is easy to navigate, start and stop. Before starting, let's ensure you have all of the prerequisites installed.

You need the latest stable versions of [Node] and [Docker]. Both of these are straightforward to install and do not require any special setup. There are other tools to install for deployment purposes, these are described in the [DevOps] section of this documentation.

## Clone the Source Repository

To start, fork [Titus] on GitHub. It is easier to maintain your own fork as Titus is designed to diverge. It is unlikely you will need to pull from the source repository again.

Once you have your fork, clone a copy of it locally:

```sh
git clone https://github.com/<your-fork>/titus.git
```

## Install Dependencies

Change directory to the root folder of the project, and run the following npm command:

```sh
npm install
```

Dependencies are installed for all parts of the repository.

## Configure the Environment

Titus uses the `.env` files in each package to control various configurations. There are `.sample.env` files for each package, documenting sample values that can be used in each `.env` file.

Before running the stack, generate a default set of `.env` files for all packages. To do this, run the following command in the root directory of the project:

```sh
npm run create:env
```

You can read more about configuring the environment in the [Developers][developersbe] section of our documentation.

## Bring up the Database

You can run the database as a stand-alone container or as a HTTP server.

For more information on how to manage the database, refer to [Manage the Database] in the Developer section of this documentation.

### Run the Database as a Stand-alone Container

To spin up the database run the command:

```sh
npm run db:up
```

You can check the `docker-compose.yml` file in the root of the repository for specifics of what is running in Docker.

### Run the Database as a HTTP Server

You can start a separate HTTP database server with the command:

```sh
npm run db:server:start
```

However, if you want to use a Fastify plugin you can use this stub:

```js
const titusDbManager = require('../titus-db-manager/lib/plugin')
...
const server = require('fastify')
server.register(titusDbManager)
```

#### Routes

- `POST /db/truncate` runs the truncate action
- `POST /db/seed` runs the seed action
- `POST /db/migrate` runs the migrations

## Run the Stack

Titus runs your application locally, leveraging Docker for external services such as a database.
We take advantage of Lerna shortcuts to start all the packages in sequence.
Our packages support hot reloading, using [webpack devServer][webpack-dev-server] (for Titus frontend) and [NodeMon] (for Titus backend).

Ensure Docker has started on your machine before running the stack.
To run the full stack, in the root of the project, run the command:

```sh
npm run start:all
```

Frontend and backend logs are output to the console if you run the stack with the command above.

Congratulations! You are now running Titus locally.

### Log In

The application is accessed at `localhost:3000` in a web browser. First access requires you to log in to the system:

![x](../img/titus-login.png)
Fig1. Titus Login Page

Enter a username and password. A minimum of 4 characters (including at least one letter or one number) is required for the password. On successful login, the home page for Titus is displayed:

![x](../img/titus-home-page.png)
Fig.2 Titus Home Page

The home page links you to the documentation (here), if you did not start from the Titus site.

**Note:** You can log out of the system from the home page.

### Lint and Test

For new installs, you will need to build the frontend before `test:all`.

- `cd packages/titus-frontend npm run build`
- ` cd ../..`

To lint and test across the stack, use the command format `npm run <command>` in the root directory of the repository. For example:

- `npm run lint:all`- Runs the `lint` command in each package that has one
- `npm run test:all`- Runs the `test` command in each package that has one

Both frontend and backend starter packages have linting and testing built in and run green in both cases by default. If any changes break the included rules, the starter package runs red.

## Next Steps

If you would like more information, select the documentation most relevant to you:

- Deep dive into our documentation for [Developers].
- See our detailed [DevOps] documentation.
- [Frontend Quick Start](developers/packages/titus-frontend/?id=quick-start).

<!-- External Links -->

[docker]: https://docs.docker.com/install/#supported-platforms
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/get-npm
[titus]: https://github.com/nearform/titus
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server
[nodemon]: https://nodemon.io

<!-- Internal Links -->

[devops]: devops/
[developers]: developers/
[manage the database]: developers/packages/titus-db-manager/?id=manage-the-database
[developersbe]: developers/?id=backend-package
