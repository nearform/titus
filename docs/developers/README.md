# Developers

## Overview
A large factor in project success rests in the ability of its developers to work unimpeded. Often, tooling for building and running a given stack locally reduces productivity.

With Titus we ensure the developer experience is accelerated and enhanced. Titus does this by:

- Providing a solution that is easy to use for both frontend and backend developers. It is designed to spin up your application locally, without compromising on developer tools.

- Including commands for linting, testing, running and stopping your application. Commands to support local manipulation, spinning up and tearing down of the system are also included and documented.

- Including a complete CI solution that builds assets, lints and runs tests and produces production ready containers.

- Letting you select technologies, such as CSS frameworks or data management libraries, of your own choice. Titus is lean and opinionated enough to be reusable and reduce complexity.

- Including documentation for projects and modules is vital to ensure knowledge sharing. Markdown is an industry standard and can produce easy-to-host static sites.

Our documentation includes details on how to install, configure and deploy an application using Titus. We also include external links to all the tools and libraries used with Titus.

## Packages
Titus includes just what's needed out of the box. Each package has a minimal complement of features and technology inclusions. In all cases we chose packages that work successfully for us in real production software. Titus provides just enough of everything to be deployment ready, without locking developers into feature-level technology decisions.

Packages are managed with [Lerna] so you can add more packages and also manage their interdependencies.
Titus includes the following packages:
* [Frontend Package](packages/titus-frontend/)
* [Backend Package](packages/titus-backend/)
* [Backend Package with Typescript](packages/titus-backend-typescript/)
* [Database Manager Package](packages/titus-db-manager/)

All packages we provide include:
- [Jest] for testing
- [ESLint] code linter and [Prettier] code formatter
- Testing libraries, such as [nock] or [faker]

### Frontend Package
The frontend, __titus-frontend__, is a minimal app built on [create-react-app] and [react-router].

We include [yup] for form validation, which powers the included auth components. React components are tested with [Testing Library][testing-library].
Because it runs with [webpack-dev-server], it supports hot rebuilding.

The Titus frontend package consists of the following:

* React application with [create-react-app]
* Route management with [react-router]
* Login component (with optional Auth0 support)
* [Jest] and [Testing Library][testing-library] test tools
* [ESLint] code linter
* [Prettier] code format with [Standard] preset


Refer to the section [Titus Frontend](developers/packages/titus-frontend/) for more details.


### Backend Package
The backend, __titus-backend__, is built on [Fastify] server with [Pino], to make logging a treat.

We also provide a plugin to instrument your routes with a [node-postgres] toolkit for easier interfacing with PostgreSQL, and another plugin for enabling [Auth0] authentication with [JSON Web Tokens][jwt].

[Nodemon] is used to power hot reloading on file changes when running locally, and ensures your application restarts due to uncaught exceptions or unhandled promises.

The Titus backend package consists of the following:

* [Fastify] HTTP server
* [Pino] logger (comes with Fastify)
* Automatic restart and hot reloading with [Nodemon]
* [12-Factor App recommendation][config] and reads configuration from environment variables
* [PostgreSQL plugin][node-postgres] with transaction control at route level
* Sample source structure for organising Fastify routes and plugin
* [Jest], [nock] and [faker] test tools
* [ESLint] code linter
* [Prettier] code format with [Standard] preset
* [Swagger] interactive API documentation, can be accessed on the endpoint /documentation

Refer to the section [Titus Backend](packages/titus-backend/) for more details.


### Database Manager Package
The database, __titus-db-manager__, preconfigured instance of [PostgreSQL] database.

When PostgreSQL is used you can take advantage of migration (powered by [Postgrator]), seeding support and truncate.

Locally Titus uses Docker Compose and Docker Volumes to run and manage the database. When running on a cloud provider, the included relational database service is used.

The Titus database manager package consists of the following:

* [Postgrator] SQL migration library
* [Pino] logger (comes with Fastify)
* PostgreSQL plugin with transaction control at route level
* [Jest], [nock] and [faker] test tools
* [ESLint] code linter
* [Prettier] code format with [Standard] preset

Refer to the section [Titus Backend](packages/titus-db-manager/) for more details.


## Services
Your application is likely to depend on both external and cloud services.
Titus comes preconfigured with a database and an authentication service, the minimum we think you need based on our projects.

[Production parity][parity] really matters to us, so we're leveraging [docker-compose] to manage your database.

Production parity is about reducing the gap between development and production and not compromising on development tools.
Titus packages run as node.js applications on your OS. This plays better with Lerna's symlinks and [webpack-dev-server].

As we use Dockerfile to bundle the packages, it's also possible to run them locally using Docker Compose (or Minikube) if you wish.

### Authentication and Authorization Services
Authentication and Authorization are usually high priority features for a web application - allowing users to sign-in and access resources with appropriate privileges.  Titus includes configurations for third party authentication services, [Auth0](Auth0), [Amazon Cognito](cognito) and [Azure Active Directory](AzureAD) - and adopts [Casbin](casbin) to integrate these services with policies around roles and permissions.

Refer to [Configure Authentication] for more details.

<!-- Images -->
[titus-developers-quote]: ../img/titus-developers-quote.svg

<!-- Internal Links -->
[Configure Authentication]: packages/titus-frontend/?id=configure-authentication

<!-- External Links -->
[Auth0]: https://auth0.com
[AzureAD]: https://azure.microsoft.com/en-gb/services/active-directory/
[cognito]: https://aws.amazon.com/cognito/
[config]: https://12factor.net/config
[create-react-app]: https://facebook.github.io/create-react-app
[docker-compose]: https://docs.docker.com/compose
[docsify]: https://docsify.js.org
[ESLint]: https://eslint.org
[faker]: http://marak.github.io/faker.js
[Fastify]: https://fastify.io
[Hapi]: https://hapijs.com
[Jest]: https://jestjs.io
[jwt]: https://jwt.io
[Lerna]: https://lerna.js.org/
[nock]: https://github.com/nock/nock#readme
[node-postgres]: https://node-postgres.com
[Nodemon]: https://nodemon.io
[parity]: https://12factor.net/dev-prod-parity
[Pino]: http://getpino.io
[Postgrator]: https://github.com/rickbergfalk/postgrator#readme
[PostgreSQL]: https://www.postgresql.org/
[Prettier]: https://prettier.io
[react-router]: https://reacttraining.com/react-router/web
[Standard]: https://standardjs.com/
[Swagger]: https://swagger.io/
[testing-library]: https://testing-library.com/docs/react-testing-library/intro
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server
[yup]: https://github.com/jquense/yup#readme

