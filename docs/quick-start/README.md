![quick-start-quote]

# Quick start

Titus is easy to install and run. We encourage developers to install Titus locally themselves - it should feel easy to navigate around, start and stop. Before we go further however, let's ensure you have all of the prerequisites installed.

You will need the latest stable versions of [Node], [npm], and [Docker]. Both of these should be trivial to install and do not require any special setup. There are other tools to install for deployment purposes, these will be covered later in the [DevOps] section of this documentation.

## Clone the source repo
To kick everything off, fork [Titus] on Github, it will be easier to maintain your own fork as Titus is designed to diverge, it is unlikely you will need to pull from the source repository again outside of some minor cherry-picking.

Once you have your fork, clone a copy of it locally:

```sh
git clone https://github.com/<your-fork>/titus.git
```

## Install dependencies
While in the root folder of the project, run the following npm command:

```sh
npm install
```

Dependencies are installed for all constituent parts of the repository.

## Configure the environment
Titus uses `.env` files in each package to control various configuration. In all cases there are `.sample.env` files documenting what values should be in the `.env` file proper.

However, before the stack can be ran, the actual `.env` files need to be created and populated. A convenience script exists to automate this process.

To generate a default set of `.env` files for all packages, run the following command in the root of the project:

```sh
npm run create:env
```

You can read more about configuring the environment in our documentation [Developers][DevelopersBe] section .

## Running the stack
Titus runs your application locally, leveraging docker for external services such as database.
We take advantage of Lerna shortcuts to start all the packages in a row.
Our packages support hot-reloading thanks to [Webpack dev server][webpack-dev-server] (for titus-frontend) and [Nodemon] (for titus-backend).

Ensure Docker has started on your machine before running the stack. To run the full stack, in the root of the project, run:

```sh
npm run start:all
```

Frontend and backend logs will be outputted to the console if you start the application with the command above.

Running the command `docker ps` will produce a log of the running set of containers, in our case just the Postgres database. It should look something like this:

```sh
CONTAINER ID        IMAGE                         NAMES
e553c840fbdc        postgres:10.4-alpine          titus-db
```

Congratulations! You are now running titus locally. Check the `docker-compose.yml` file in the root of the repository for specifics of what is running in docker and how it is composed.

### Logging in
The running application can be accessed at `localhost:3000` in any modern web browser. First access will require you to log into the system:

![x](../img/titus-login.png)

The login is set to accept any reasonable username and password. On successful login you will see
the splash page for Titus:

![x](../img/titus-home-page.png)

The splash screen will link you back to the documentation (here) should you not have started from the titus site. Note that you can also log out of the system on the splash screen.

### Manipulating the  running stack
A number of useful commands for manipulating the running docker stack have been included as easy to run scripts. These can be ran by running `npm run <command>` in the root of the repo; where command is:

- `npm run docker:dev:create-volume` - runs `docker volume create` to create a data volume with name `titus-pg-data`
- `npm run docker:dev:logs` - runs `docker-compose logs` and passes `-f` so they auto-tail
- `npm run docker:dev:rmi` - runs `docker-compose down` but passes ` --rmi all` to tear down postgres fully
- `npm run docker:dev:start` - first, runs `docker:dev:create-volume` to create a data volume, then `docker-compose up -d --build` to start Postgres locally in docker
- `npm run docker:dev:stop` - Runs `docker-compose down` to spin down the running Postgres

For example, to tear down the system, spin it back up and tail the logs, the commands would be:

```sh
npm run docker:dev:rmi
npm run start:all
npm run docker:dev:logs
```

### Stopping the stack
You can can also stop the stack by running:

```sh
npm run stop:all
```

While this command will stop the system it will not delete the stack containers or volumes. To delete the containers produced run:

```sh
npm run docker:dev:rmi
```

### Linting and Testing
Linting and testing can be ran can across the stack by running `npm run <command>` in the root of the repo; where command can be one of:

- `lint:all`
  - Runs the `lint` command in each package that has one
- `test:all`
  - Runs the `test` command in each package that has one

Both frontend and backend starter kits have linting and testing built in and as such should run green in both cases by default, and red should any change violate the included rules.

## Next steps

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
[DevelopersBe]: developers/packages/titus-backend


<!-- Images -->
[quick-start-quote]: ../img/titus-quick-start-quote.svg
