![titus-developers-quote][]

# Developers

## Packages
Titus includes a number of applications and services out of the box.

### Frontend Kit
The frontend, __titus-frontend__, is a minimal app built on [create-react-app][] and [react-router][]. We include [yup][] for form validation, which powers the included auth components. Testing is via [Jest][] and [Enzyme][], linting is done via [eslint][] and enforced via [prettier][].

- [More information](developers/packages/titus-frontend/)

### Backend Kit
The backend, __titus-backend__, is built on [Hapi][], [Auth0][] and some choice plugins, like [hapi-pino][], to make development a treat. The backend has built in support for database migrations and seeding.

- [More information](developers/packages/titus-backend/)

### Starter Docs Kit
Titus includes a start kit, __titus-starter-docs__, for documentation that is ready to run. The documentation is Github Pages and CDN friendly and can be hosted in folder of a given repo without the need to include dependencies solely to support documentation.

- [More information](developers/packages/starter-docs/)

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
