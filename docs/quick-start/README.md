![quick-start-quote]

# Titus Quick Start

Titus is easy to install and run. We encourage developers to install Titus locally themselves - it is easy to navigate, start and stop. Before starting, let's ensure you have all of the prerequisites installed.

You need the latest stable versions of [Node], and [Docker]. Both of these are straightforward to install and do not require any special setup. There are other tools to install for deployment purposes, these are described in the [DevOps] section of this documentation.

## Clone the Source Repository
To start, fork [Titus] on Github. It is easier to maintain your own fork as Titus is designed to diverge. It is unlikely you will need to pull from the source repository again.

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

Before running the stack, generate a default set of `.env` files for all packages. o do this, run the following command in the root directory of the project:

```sh
npm run create:env
```

You can read more about configuring the environment in the [Developers][DevelopersBe] section of our documentation.

## Run the Stack
Titus runs your application locally, leveraging Docker for external services such as a database.
We take advantage of Lerna shortcuts to start all the packages in sequence.
Our packages support hot reloading; using [Webpack dev server][webpack-dev-server] (for Titus frontend) and [NodeMon] (for Titus backend).

Ensure Docker has started on your machine before running the stack.
To run the full stack, in the root of the project, run the command:

```sh
npm run start:all
```

Frontend and backend logs are output to the console if you run the stack with the command above.

The command `docker ps` produces a log of the running set of containers, in our case, the Postgres database. For example:

```sh
CONTAINER ID        IMAGE                         NAMES
e553c840fbdc        postgres:10.4-alpine          titus-db
```

Congratulations! You are now running Titus locally. You can check the `docker-compose.yml` file in the root of the repository for specifics of what is running in Docker.

### Log In
The application is accessed at `localhost:3000` in a web browser. First access requires you to log in to the system:

![x](../img/titus-login.png)

Enter a username and password. A minimum of 4 characters (including at least one letter or one number) is required for the password. On successful log in, the home page for Titus is displayed:

![x](../img/titus-home-page.png)

The home page links you to the documentation (here), if you did not start from the Titus site.
**Note** You can log out of the system from the home page.

### Manipulate the Running Stack
A number of useful commands for manipulating the running Docker stack are included with Titus as easy to run scripts. Use the command format `npm run <command>` in the root directory of the repository. For example:

- `npm run docker:dev:create-volume` - runs `docker volume create` to create a data volume with name `titus-pg-data`
- `npm run docker:dev:logs` - runs `docker-compose logs` and passes `-f` so they auto-tail
- `npm run docker:dev:rmi` - runs `docker-compose down` but passes ` --rmi all` to tear down postgres fully
- `npm run docker:dev:start` - first, runs `docker:dev:create-volume` to create a data volume, then `docker-compose up -d --build` to start Postgres locally in Docker
- `npm run docker:dev:stop` - Runs `docker-compose down` to spin down the running Postgres

For example, to tear down the system, spin it back up and tail the logs, the commands are:

```sh
npm run docker:dev:rmi
npm run start:all
npm run docker:dev:logs
```

### Stop the Stack
You can stop the stack with the command:

```sh
npm run stop:all
```

This command stops the system, but does not delete the stack containers or volumes. To delete the containers and volumes, run the command:

```sh
npm run docker:dev:rmi
```

### Linting and Testing
To perform linting and testing across the stack, use the command format `npm run <command>` in the root directory of the repository. For example:
- `npm run lint:all`- Runs the `lint` command in each package that has one
- `npm run test:all`- Runs the `test` command in each package that has one

Both frontend and backend starter kits have linting and testing built in and run green in both cases by default. If any changes break the included rules, the starter kit runs red.

## Next Step
If you would like more information, select the documentation most relevant to you:

- Deep dive into our documentation for [Developers].
- See our detailed [DevOps] documentation.


<!-- External Links -->
[Docker]: https://docs.docker.com/install/#supported-platforms
[Node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/get-npm
[Titus]: https://github.com/nearform/titus
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server
[Nodemon]: https://nodemon.io

<!-- Internal Links -->
[DevOps]: devops/
[Developers]: developers/
[DevelopersBe]: developers/?id=backend-kit


<!-- Images -->
[quick-start-quote]: ../img/titus-quick-start-quote.svg
