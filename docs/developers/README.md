![titus-developers-quote][]

# Developers
A large percentage of the success of a project rests in the ability of it's developers to work unimpeded. In many cases tooling for building and running a given stack locally can seriously hamper productivity.

With Titus we wanted to ensure the developer experience accelerated the speed at which developers work. We do this by following the guidelines below:

- Local development should be easy for both frontend and backend developers. This means running the full system locally in Docker should not impede the speed of development or the use of auto rebuilding of code and assets while the system is running.

- Commands for linting, testing, running, stopping, etc should be included. Commands to support local manipulation, spinning up and tearing down of the system should be included and documented.

- Technology selections such as CSS frameworks or data management libraries are left to the consumer of Titus. This keeps Titus opinionated enough to be reusable and reduces the overall complexity of use.

- A complete CI solution should be included that can build assets, lint and run tests, produce production ready containers and support deployment via helm should be included.

Across this documentation you will find the results of decisions made using the guidelines above. Rather than list each choice individually, we try call out external links to all tools and libraries. Where appropriate we explain some decisions in detail.

## Packages
Titus includes a number of applications and services out of the box. Each package has a minimal complement of features and technology inclusions. In all cases we have defaulted to choices that we have found to work successfully in real production software. Overall Titus provides just enough of everything to be deployment ready, without locking developers into feature level technology decisions.

### Frontend Kit
The frontend, __titus-frontend__, is a minimal app built on [create-react-app][] and [react-router][]. We include [yup][] for form validation, which powers the included auth components. Testing is via [Jest][] and [Enzyme][], linting is done via [eslint][] and enforced via [prettier][]. Support for hot rebuilding via the included create-react-app tools is supported while running the frontend in Docker.

- [More information](developers/packages/titus-frontend/)

### Backend Kit
The backend, __titus-backend__, is built on [Hapi][], [Auth0][] and some choice plugins, like [hapi-pino][], to make logging a treat. The backend has built in support for data migrations and seeding assuming included database is used. [NodeMon][] is used to to power hot reloading on file changes when running locally in Docker.

- [More information](developers/packages/titus-backend/)

### Starter Docs Kit
Titus includes a start kit, __titus-starter-docs__, for documentation that is ready to run. This package is Github Pages and CDN friendly and can be hosted in folder of a given repo without the need to include dependencies solely to support documentation. Docs are powered by [docsify][] which requires zero in-repo dependencies.

- [More information](developers/packages/titus-starter-docs/)

## Services
Titus comes pre configured with a number of services to help you get started quickly. These are, 

### PostgreSQL
Titus includes a pre configured instance of PostgreSQL. When used with __titus-backend__ migration and seeding support can be taken advantage of. Locally Titus makes use of Docker and Docker Volumes to handle the database. When running on a Cloud provider, the included Relation Database service is used.

- [More information](starter-docs)

### Auth via Auth0
Clients consider 'logging in' as the primary first feature they want to see when. Titus comes pre-configured for Auth0.

- [More information](starter-docs)

## Documentation
Documentation for projects and modules or tools produced for the project is of vital importance to ensure the long term knowledge sharing. With this in mind, Titus itself is heavily documented in the `docs/` folder in the root of the repository. We have also included a docs template package in `packages/titus-starter-docs` to make documentation for any new part of the project a breeze.


<!-- Images -->
[titus-developers-quote]: ../img/titus-developers-quote.svg

<!-- External Links -->
[create-react-app]: https://facebook.github.io/create-react-app/
[react-router]: /
[yup]: /
[Jest]: /
[Enzyme]: /
[ESLint]: /
[Prettier]: /
[Hapi]: /
[hapi-pino]: /
[Auth0]: /
[NodeMon]: /
[docsify]: /
