![titus-developers-quote]

# Developers
A large factor in the success of a project rests in the ability of its developers to work unimpeded. Often, tooling for building and running a given stack locally can reduce productivity.

With Titus we ensure the developer experience accelerates the speed at which developers work. We do this by following the guidelines below:

- Local development should be easy for both frontend and backend developers. They should have an easy solution to spin up the application locally, without giving up on developer tools.

- Commands for linting, testing, running and stopping your application should be included. Commands to support local manipulation, spinning up and tearing down of the system should be included and documented.

- Selecting technologies, such as CSS frameworks or data management libraries, is your own choice. Titus is lean and opinionated enough to be reusable and reduce complexity. It does not stand in your way.

- A complete CI solution should be included that can build assets, lint and run tests, produce production ready containers, and support deployment via Helm.

- Documentation for projects and modules is of vital importance to ensure knowledge sharing. Markdown is now an industry standard and can produce easy-to-host static sites.

In our documentation you will find the decision results using the guidelines above. Rather than list each choice, we include external links to all the tools and libraries. Where appropriate, we explain decisions in more detail.

## Packages
Titus includes just what's needed out of the box. Each package has a minimal complement of features and technology inclusions. In all cases we chose packages that worked successfully for us in real production software. Titus provides just enough of everything to be deployment ready, without locking developers into feature-level technology decisions.

Packages are managed with [Lerna] so you can add more packages and also manage their interdependencies.

All packages we provide include:
- [Jest] for testing
- [ESLint] code linter and [Prettier] code formatter
- testing libraries, such as [nock] or [faker]

### Frontend Kit
The frontend, __titus-frontend__, is a minimal app built on [create-react-app] and [react-router]. 

We include [yup] for form validation, which powers the included auth components. React components are tested with [Enzyme].
Because it runs with [webpack-dev-server], it supports hot rebuilding.

- [More information](developers/packages/titus-frontend/)

### Backend Kit
The backend, __titus-backend__, is built on a [Hapi] server with [Pino], to make logging a treat.

We also provide a plugin to instrument your routes with a [node-postgres] toolkit for easier interfacing with Postgres, and another plugin for enabling [Auth0] authentication with [JSON Web Tokens][jwt].

[NodeMon] is used to power hot reloading on file changes when running locally, and make sure your application restarts due to uncaught exceptions or unhandled promises.

- [More information](developers/packages/titus-backend/)

### Backend Kit (Fastify)
The backend, __titus-backend-fastify__, is built on [Fastify] server with [Pino], to make logging a treat.

We also provide a plugin to instrument your routes with a [node-postgres] toolkit for easier interfacing with Postgres, and another plugin for enabling [Auth0] authentication with [JSON Web Tokens][jwt].

[NodeMon] is used to power hot reloading on file changes when running locally, and make sure your application restarts due to uncaught exceptions or unhandled promises.

- [More information](developers/packages/titus-backend-fastify/)

### Starter Docs Kit
Titus includes a documentation starter kit, __titus-starter-docs__, so you can document your application.

This package is GitHub Pages and CDN (Content Delvery Network) friendly and can be hosted in the folder of a given repo without the need to include dependencies solely to support documentation. 

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

When PostgreSQL is used with __titus-backend__, migrations (powered by [postgrator]) and seeding support can be taken advantage of. 

Locally Titus uses Docker Compose and Docker Volumes to handle the database. When running on a cloud provider, the included relation database service is used.

- [More information](starter-docs)

### Auth via Auth0
Clients consider logging in as the first feature they want to see. Titus comes preconfigured for Auth0.

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
[NodeMon]: https://nodemon.io
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
