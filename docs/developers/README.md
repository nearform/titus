![titus-developers-quote][]

# Developers

## Documentation
Documentation for projects and modules or tools produced for the project is of vital importance to ensure the long term knowledge sharing. With this in mind, Titus itself is heavily documented in the `docs/` folder in the root of the repository. We have also included a docs template package in `packages/` to make documentation for any part of the project a breeze.

## Packages
Titus includes a number of applications and services out of the box.

### Frontend Kit
The frontend, [titus-frontend](), is built on [create-react-app](), with the addition of [Storybook](), [Material UI](), [Reach Router]() and more. It includes demos of open source client libraries we use, NearForm's own open source projects and design system. It also shows how to use the React components contained in the [titus-components]() package.

- [More information](packages/titus-frontend/)


### Backend Kit
The [backend](/kitchen-sink-backend) is built on [Hapi](), [PostgreSQL](), and [Docker](). It also includes demos of open source backend libraries and NearForm's open source packages.

- [More information](titus-backend)

### Documentation Kit
Titus includes a start kit for documentation that is ready to run. The documentation is Github Pages and CDN friendly and can be hosted in folder of a given repo without the need to include dependencies solely to support documentation.

- [More information](starter-docs)

## Services
Titus comes pre configured with a number of services pre configured to run locally and when deployed. 

### PostgreSql
We find the need for a database in over 80% of project cases. With this in mind Titus comes with a pre-configured instance of PostgreSql.

- [More information](starter-docs)

### Auth via Auth0
Clients consider 'logging in' as the primary first feature they want to see when. Titus comes pre-configured for Auth0.

- [More information](starter-docs)

<!-- Images -->
[titus-developers-quote]: ../img/titus-developers-quote.svg
