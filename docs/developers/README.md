![titus-developers-quote]

# Developers
A large factor in the success of a project rests in the ability of its developers to work unimpeded. Often, tooling for building and running a given stack locally reduces productivity.

With Titus we ensure the developer experience is accelerated and enhanced. Titus does this by:

- Providing a solution that is easy to use for both frontend and backend developers. It is designed to spin up your application locally, without compromising on developer tools.

- Including commands for linting, testing, running and stopping your application. Commands to support local manipulation, spinning up and tearing down of the system are also included and documented.

- Including a complete CI solution that builds assets, lints and runs tests, produces production ready containers, and supports deployment via Helm.

- Letting you select technologies, such as CSS frameworks or data management libraries, of your own choice. Titus is lean and opinionated enough to be reusable and reduce complexity.

- Including documentation for projects and modules is vital to ensure knowledge sharing. Markdown is an industry standard and can produce easy-to-host static sites.

Our documentation includes details on how to install, configure and deploy an application using Titus. We also include external links to all the tools and libraries used with Titus.

## Kits
Titus includes just what's needed out of the box. Each kit has a minimal complement of features and technology inclusions. In all cases we chose kits that work successfully for us in real production software. Titus provides just enough of everything to be deployment ready, without locking developers into feature-level technology decisions.

Kits are managed with [Lerna] so you can add more packages and also manage their interdependencies.
Titus includes the following kits:
* Frontend Kit
* Backend Kit
* Documentation Kit

All kits we provide include:
- [Jest] for testing
- [ESLint] code linter and [Prettier] code formatter
- testing libraries, such as [nock] or [faker]

### Frontend Kit
The frontend, __titus-frontend__, is a minimal app built on [create-react-app] and [react-router].

We include [yup] for form validation, which powers the included auth components. React components are tested with [Enzyme].
Because it runs with [webpack-dev-server], it supports hot rebuilding.

- [More information](developers/packages/titus-frontend/)


### Backend Kit (Fastify)
The backend, __titus-backend__, is built on [Fastify] server with [Pino], to make logging a treat.

We also provide a plugin to instrument your routes with a [node-postgres] toolkit for easier interfacing with PostgreSQL, and another plugin for enabling [Auth0] authentication with [JSON Web Tokens][jwt].

[Nodemon] is used to power hot reloading on file changes when running locally, and ensures your application restarts due to uncaught exceptions or unhandled promises.

- [More information](developers/packages/titus-backend/)

### Documentation Kit
Titus includes a documentation kit, __titus-starter-docs__, so you can document your application.

This kit is GitHub Pages and CDN (Content Delvery Network) friendly and can be hosted in the folder of a given repo without the need to include dependencies solely to support documentation.

Documents are powered by [docsify] which has no in-repo dependencies, and provides hot reloading when editing the documents.

- [More information](developers/packages/titus-starter-docs/)

## Services
Your application is likely to depend on both external and cloud services.
Titus comes preconfigured with a database and an authentication service, the minimum we think you need based on our projects.

[Production parity][parity] really matters to us, so we're leveraging [docker-compose] to manage your database.

Production parity is about reducing the gap between development and production and not compromising on development tools.
Titus packages run as node.js applications on your OS. This plays better with Lerna's symlinks and [webpack-dev-server].

As we use Dockerfile to bundle the packages, it's also possible run them locally using Docker Compose (or Minikube) if you wish.

### PostgreSQL
Titus includes a preconfigured instance of PostgreSQL.

When PostgreSQL is used with __titus-backend__, you can take advantage of migration (powered by [postgrator]) and seeding support.

Locally Titus uses Docker Compose and Docker Volumes to run and manage the database. When running on a cloud provider, the included relational database service is used.

- [More information](starter-docs)

### Auth via Auth0
Logging in is usually the first feature you want to see when you run your application. Titus is preconfigured for Auth0.

- [More information](starter-docs)

<!-- Images -->
[titus-developers-quote]: ../img/titus-developers-quote.svg

<!-- External Links -->
[create-react-app]: https://facebook.github.io/create-react-app
[react-router]: https://reacttraining.com/react-router/web
[yup]: https://github.com/jquense/yup#readme
[Jest]: https://jestjs.io
[Enzyme]: https://airbnb.io/enzyme
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[Hapi]: https://hapijs.com
[Fastify]: https://fastify.io
[Pino]: http://getpino.io
[Auth0]: https://auth0.com
[Nodemon]: https://nodemon.io
[node-postgres]: https://node-postgres.com
[docsify]: https://docsify.js.org
[Lerna]: https://lernajs.io
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server
[jwt]: https://jwt.io
[nock]: https://github.com/nock/nock#readme
[faker]: http://marak.github.io/faker.js
[postgrator]: https://github.com/rickbergfalk/postgrator#readme
[parity]: https://12factor.net/dev-prod-parity
[docker-compose]: https://docs.docker.com/compose
