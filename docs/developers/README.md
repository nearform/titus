![titus-developers-quote][]

# Developers
A large percentage of the success of a project rests in the ability of it's developers to work unimpeded. In many cases tooling for building and running a given stack locally can seriously hamper productivity.

With Titus we wanted to ensure the developer experience accelerated the speed at which developers work. We do this by following the guidelines below:

- Local development should be easy for both frontend and backend developers. They should have easy solution to spin up the entire application localy, without giving up on developer tools.

- Commands for linting, testing, running, stopping your application should be included. Commands to support local manipulation, spinning up and tearing down of the system should be included and documented.

- Selecting technologies such as CSS frameworks or data management libraries is your own choice. Titus is lean and just opinionated enough to be reusable and reduces the overall complexity of use. It does not stand in your way.

- A complete CI solution should be included that can build assets, lint and run tests, produce production ready containers and support deployment via helm should be included.

- Documentation for projects and modules is of vital importance to ensure the long term knowledge sharing. Markdown is now an industry standard, and it can produce easy-to-host static sites

Across this documentation you will find the results of decisions made using the guidelines above. Rather than list each choice individually, we try call out external links to all tools and libraries. Where appropriate we explain some decisions in detail.

## Packages
Titus includes just what's needed out of the box. Each package has a minimal complement of features and technology inclusions. In all cases we have defaulted to choices that we have found to work successfully in real production software. Overall Titus provides just enough of everything to be deployment ready, without locking developers into feature level technology decisions.

Packages are managed with [Lerna] so you could easily add more and easily manage their inter-dependencies.

All packages we provide include:
- [Jest] for testing
- [ESLint] code linter and [Prettier] code formatter
- Some usefull testing libraries, such as [nock] or [faker]

### Frontend Kit
The frontend, __titus-frontend__, is a minimal app built on [create-react-app] and [react-router]. 

We include [yup] for form validation, which powers the included auth components. React components are tested with [Enzyme].
As it runs with [webpack-dev-server], it supports hot rebuilding.

- [More information](developers/packages/titus-frontend/)

### Backend Kit
The backend, __titus-backend__, is built on [Hapi] server with [Pino], to make logging a treat.

We provide as well a plugin to instrument your routes with [node-postgres] toolkit, so they could issue database queries on Postgres like a breathe, and another enabling authentication on [Auth0] with [JSON Web Tokens][jwt].

[NodeMon] is used to to power hot reloading on file changes when running locally, and make sure your application restart on uncaught exceptions or unhandled promises.

- [More information](developers/packages/titus-backend/)

### Starter Docs Kit
Titus includes a documentation start kit, __titus-starter-docs__, so you could easily document your application.

This package is Github Pages and CDN friendly and can be hosted in folder of a given repo without the need to include dependencies solely to support documentation. 

Docs are powered by [docsify] which requires zero in-repo dependencies, and provide hot-reloading when editing the docs

- [More information](developers/packages/titus-starter-docs/)

## Services
Your application is likely to depend on external and cloud services. 
Titus comes pre configured with a database and an authentication service, the bare minimum we could think of from our projects.

[Production parity][parity] really matters to us, so we're leveraging [docker-compose] to start your Database.

However, production parity is about reducing the gap between dev and prod, not giving up on developement tools.
Titus packages still run as node.js regular application on your OS. This plays better with Lerna's symlinks and [webpack-dev-server].

Since we use Dockerfile to bundle the packages, it's always possible run them locally using docker-compose (or mini-cube) if you want to.

### PostgreSQL
Titus includes a pre configured instance of PostgreSQL. 

When used with __titus-backend__ migrations (powered by [postgrator]) and seeding support can be taken advantage of. 

Locally Titus makes use of Docker-compose and Docker Volumes to handle the database. When running on a Cloud provider, the included Relation Database service is used.

- [More information](starter-docs)

### Auth via Auth0
Clients consider 'logging in' as the primary first feature they want to see when. Titus comes pre-configured for Auth0.

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